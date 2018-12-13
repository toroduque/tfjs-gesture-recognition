import * as tf from '@tensorflow/tfjs'
import React, { Component } from 'react'
import throttle from 'lodash.throttle'
import ControllerDataset from '../ControllerDataset'

class Classifier extends Component {
    constructor(props) {
        super(props)
        this.handleUpdateSelectedOption = throttle(this.props.updateSelectedOption, 3000)
    }

    state = {
       numClasses: 5,
       truncatedMobileNet: null,
       model: null,
       learningRate: 0.0001,
       epochs: 30,
       isPredicting: false,
       thumbDisplayed: {}
    }

    controllerDataset = new ControllerDataset(this.state.numClasses)
    CONTROLS = ['left', 'right', 'one', 'two', 'three']

    componentDidMount = async () => {
        this.props.onRef(this)
        const truncatedMobileNet = await this.loadTruncatedMobileNet()
        this.setState({truncatedMobileNet})
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    componentDidUpdate(prevProps) {
        const { truncatedMobileNet } = this.state
        // Warm up the model. This uploads weights to the GPU and compiles the WebGL
        // programs so the first time we collect data from the webcam it will be
        // quick.

        if(prevProps.webcam !== this.props.webcam && truncatedMobileNet) {
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
                return predictions.as1D()
            })

            const predictionsArray = await predictedClass.data()
            const classId = (await predictedClass.argMax().data())[0]
            const accuracy = predictionsArray[classId]

            // Clean memory with dispose
            predictedClass.dispose()

            if(accuracy > 0.995){
                this.handleUpdateSelectedOption(this.CONTROLS[classId])
            }

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
            const canvasId = `${this.CONTROLS[label]}-thumb`
            const thumbCanvas = document.getElementById(canvasId)
            this.draw(img, thumbCanvas)
        }
    }

    getExamples = async (label) => {
        tf.tidy(() => {
            const img = this.props.webcam.capture();
            this.controllerDataset.addExample(this.state.truncatedMobileNet.predict(img), label)
            this.drawThumb(img, label)
        })
    }

    render = () => <div></div>
}

export default Classifier


