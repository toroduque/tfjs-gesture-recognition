import * as tf from '@tensorflow/tfjs'
import React, { Component } from 'react'
import ControllerDataset from '../ControllerDataset'

class Classifier extends Component {
    state = {
       numClasses: 5,
       truncatedMobileNet: null,
       model: null,
       learningRate: 0.001,
       epochs: 20,
       isPredicting: false,
       thumbDisplayed: {}
    }

    controllerDataset = new ControllerDataset(this.state.numClasses)
    CONTROLS = ['left', 'right', 'one', 'two', 'three']

    componentDidMount = async () => {
        const truncatedMobileNet = await this.loadTruncatedMobileNet()
        this.setState({truncatedMobileNet})
    }

    componentDidUpdate(prevProps) {
        // Warm up the model. This uploads weights to the GPU and compiles the WebGL
        // programs so the first time we collect data from the webcam it will be
        // quick.

        if(prevProps.webcam !== this.props.webcam){
            tf.tidy(() => this.state.truncatedMobileNet.predict(this.props.webcam.capture()));
        }
    }

    async loadTruncatedMobileNet() {
        const mobilenetUrl = 'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json'
        const mobilenet = await tf.loadModel(mobilenetUrl)
        const layer = mobilenet.getLayer('conv_pw_13_relu')
    
        return tf.model({inputs: mobilenet.inputs, outputs: layer.output})
    }

    train = async () => {
        this.setState({isPredicting: false})

        const optimizer = tf.train.adam(this.state.learningRate)
        const model = await tf.sequential({
            layers: [
                // Input Layer
                tf.layers.flatten({
                    inputShape: this.state.truncatedMobileNet.outputs[0].shape.slice(1)
                }),
                // First Layer
                tf.layers.dense({
                    units: 100,
                    activation: 'relu',
                    kernelInitializer: 'varianceScaling',
                    useBias: true
                }),
                // Output Layer
                tf.layers.dense({
                    units: this.state.numClasses,
                    activation: 'softmax',
                    kernelInitializer: 'varianceScaling',
                    useBias: false
                })
            ]
        })

        this.setState({model}, () => {
            this.state.model.compile({optimizer, loss: 'categoricalCrossentropy'})
            this.state.model.fit(this.controllerDataset.xs, this.controllerDataset.ys, {
                epochs: this.state.epochs,
                callbacks: {
                    onBatchEnd: async(batch, logs) => {
                        console.log('Loss: ', logs.loss.toFixed(5))
                    }
                }
            })
        })
    }

    predict = async () => {
        while(this.state.isPredicting) {
            const predictedClass = tf.tidy(() => {
                // Capture the frame from the webcam.
                const img = this.props.webcam.capture();
                const mobilenetPrediction = this.state.truncatedMobileNet.predict(img)
                const predictions = this.state.model.predict(mobilenetPrediction)

                // Returns the index with the maximum probability. This number corresponds
                // to the class the model thinks is the most probable given the input.
                return predictions.as1D().argMax()
            })

            const classId = (await predictedClass.data())[0]

            // Clean memory with dispose
            predictedClass.dispose()

            // this should return the label of the prediction
            console.log('classId', this.CONTROLS[classId])

            await tf.nextFrame();
        }
    } 

    handlePredict = () => {
        this.setState({isPredicting: true}, this.predict)
    }

    draw(image, canvas) {
        const [width, height] = [224, 224];
        const ctx = canvas.getContext('2d');
        const imageData = new ImageData(width, height);
        const data = image.dataSync();
        
        for (let i = 0; i < height * width; ++i) {
            const j = i * 4;
            imageData.data[j + 0] = (data[i * 3 + 0] + 1) * 127;
            imageData.data[j + 1] = (data[i * 3 + 1] + 1) * 127;
            imageData.data[j + 2] = (data[i * 3 + 2] + 1) * 127;
            imageData.data[j + 3] = 255;
        }
        ctx.putImageData(imageData, 0, 0);
    }

    drawThumb = (img, label) => {
        const { thumbDisplayed } = this.state

        if(thumbDisplayed[label] === undefined) {
            const canvasId = this.CONTROLS[label] + '-thumb'
            const thumbCanvas = document.getElementById(canvasId)
            this.draw(img, thumbCanvas)
        }
    }

    async getExamples(label) {
        tf.tidy(() => {
            const img = this.props.webcam.capture();
            this.controllerDataset.addExample(this.state.truncatedMobileNet.predict(img), label)
            this.drawThumb(img, label)
        })
    }

    render() {
        return(
            <div>
                <canvas id="left-thumb"></canvas>
                <button onClick={() => this.getExamples(0)}> Left examples </button>
                <canvas id="right-thumb"></canvas>
                <button onClick={() => this.getExamples(1)}> Right examples</button>
                <canvas id="one-thumb"></canvas>
                <button onClick={() => this.getExamples(2)}> One examples</button>
                <canvas id="two-thumb"></canvas>
                <button onClick={() => this.getExamples(3)}> Two examples</button>
                <canvas id="three-thumb"></canvas>
                <button onClick={() => this.getExamples(4)}> Three examples</button>

                <button onClick={this.train}> Train Model </button>
                <button onClick={this.handlePredict}> Predict </button>
            </div>
        )
    }
}

export default Classifier

