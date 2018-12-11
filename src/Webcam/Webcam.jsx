import * as tf from '@tensorflow/tfjs'
import React, { Component } from 'react'

class Webcam extends Component {
    constructor(props){
        super(props)
        this.video = React.createRef()
        this.test = null
        this.state = {
            videoWidth: 224,
            videoHeight: 224
        }
    }

    componentDidMount = async () => {
        this.props.onRef(this)
        const options = {
            video: {
                width: this.state.videoWidth,
                height: this.state.videoHeight
            }
        }
        const webcamSource = await navigator.mediaDevices.getUserMedia(options);
        const video = document.querySelector('video')
        video.srcObject = webcamSource
        video.onloadeddata = (e) => {
            video.height = this.state.videoHeight
            video.width = this.state.videoWidth
            video.play()
        }
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    cropImage(img) {
        const size = Math.min(img.shape[0], img.shape[1]);
        const centerHeight = img.shape[0] / 2;
        const beginHeight = centerHeight - (size / 2);
        const centerWidth = img.shape[1] / 2;
        const beginWidth = centerWidth - (size / 2)

        return img.slice([beginHeight, beginWidth, 0], [size, size, 3])
    }

    capture() {
        const video = this.video.current;
        return tf.tidy(() => {
            // Reads the image as a Tensor from the webcam <video> element.
            const webcamImage = tf.fromPixels(video)

            // Crop the image so we're using the center square of a rectangular
            // webcam.
            const croppedImage = this.cropImage(webcamImage)

            // Expand the outer most dimension so we have a batch size of 1.
            const batchedImage = croppedImage.expandDims(0)

            // Normalize the image between -1 and 1. The image comes in between 0-255,
            // so we divide by 127 and subtract 1.
            return batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
        })
    }

    render = () => <video ref={this.video}></video>
}

export default Webcam