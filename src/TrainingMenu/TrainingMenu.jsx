import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import * as styled from './styled'

const TrainingMenu = ({classifier, history}) => {
    const labels = classifier && classifier.CONTROLS
    const getExamples = classifier && classifier.getExamples
    const train = classifier && classifier.train
    const predict = classifier && classifier.handlePredict

    const handleGetExamples = (index) => {
        // Take examples every 100ms for 5 seconds
        const test = setInterval(() => getExamples(index), 5)
        setTimeout(() => {
            clearInterval(test)
        }, 6000)
    }

    return (
        <Fragment>
            { classifier &&  
            <Fragment>
                <styled.GetExamplesButtons>
                    { labels.map((label, index) => (
                        <div key={label}>
                            <canvas width="224" height="224" id={`${label}-thumb`}></canvas>
                            <button style={{display: "block"}} onClick={() => handleGetExamples(index)}> {label} examples </button>
                        </div>
                    ))}
                </styled.GetExamplesButtons>
                <styled.TrainingButtons>
                    <button onClick={train}> TRAIN </button>
                    <button onClick={() => {
                        predict()
                        history.push('/')
                    }}> START </button>
                </styled.TrainingButtons>
            </Fragment> }
        </Fragment>
       
)}

export default withRouter(TrainingMenu)