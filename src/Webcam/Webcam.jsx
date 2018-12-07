import React, { Component } from 'react'

class Webcam extends Component {
    componentDidMount = async () => {
        const options = {
            video: {
                width: 150,
                height: 150
            }
        }
        const webcamSource = await navigator.mediaDevices.getUserMedia(options);
        const video = document.querySelector('video')
        video.srcObject = webcamSource
        video.onloadeddata = e => video.play()
    }

    render = () => <video></video>
}

export default Webcam