import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import Icon from '../Images/Icon'
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

    const mapIcon = {
        'left': 'thumb-left',
        'right': 'thumb-right',
        'one': 'one-fingers',
        'two': 'two-fingers',
        'three': 'three-fingers'
    }

    return (
        <Fragment>
            { classifier &&  
            <Fragment>
                <styled.GetExamplesButtons>
                    { labels.map((label, index) => (
                        <styled.ExampleWrapper key={label}>
                            <Icon glyph={`${mapIcon[label]}`} color="papayawhip" size="80"/>
                            <div>
                                <canvas width="224" height="224" id={`${label}-thumb`}></canvas>
                            </div>
                            <button style={{display: "block"}} onClick={() => handleGetExamples(index)}> Get {label} samples </button>
                        </styled.ExampleWrapper>
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