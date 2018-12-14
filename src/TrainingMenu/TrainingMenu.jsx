import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import Loader from 'react-loader-spinner';
import Icon from '../Images/Icon'
import * as styled from './styled'

class TrainingMenu extends Component {
    state = { 
        isGettingExamples: false,
        leftSamplesReady: false,
        rightSamplesReady: false,
        oneSamplesReady: false,
        twoSamplesReady: false,
        threeSamplesReady: false,
        countdownSeconds: 6
    }

    mapIcon = {
        'left': 'thumb-left',
        'right': 'thumb-right',
        'one': 'one-fingers',
        'two': 'two-fingers',
        'three': 'three-fingers'
    }

    handleGetExamples = (index, label) => {
        const getExamples = this.props.classifier && this.props.classifier.getExamples
        this.updateIsGettingExamples(true)
        this.startCountdown()

        // Take examples every 100ms for 5 seconds
        const interval = setInterval(() => getExamples(index), 5)
        setTimeout(() => {
            clearInterval(interval)
            this.updateIsGettingExamples(false)
            this.updateSampleIsReady(label)
        }, 6000)
    }

    countdownSeconds = () => {
        this.setState(prevState => ({
            countdownSeconds: prevState.countdownSeconds - 1
        }));
    };

    startCountdown = () => {
        const interval = setInterval(this.countdownSeconds, 1000);
        setTimeout(() => {
            clearInterval(interval);
            this.setState({countdownSeconds: 6})
        }, 6000);
    };

    areSamplesReady = () => {
        const { leftSamplesReady,
                rightSamplesReady,
                oneSamplesReady,
                twoSamplesReady,
                threeSamplesReady } = this.state

        return leftSamplesReady && rightSamplesReady && oneSamplesReady && twoSamplesReady && threeSamplesReady
    }

    updateIsGettingExamples = (isGettingExamples) => {
        this.setState({isGettingExamples})
    }
    
    updateSampleIsReady = (label) => {    
        this.setState({ [`${label}SamplesReady`]: true})
    }

    renderLoaders = () => (
        <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/e1f96a28913349.55d8bdb1df7b6.gif" alt=""/>
            <styled.LoadersWrapper>
                <Loader type="Triangle" color="#6b41f4" height={50} width={50} />
                <Loader type="Triangle" color="#f4de16" height={50} width={50} />
                <Loader type="Triangle" color="#f92c5c" height={50} width={50} />
            </styled.LoadersWrapper>
            <div style={{'text-align': 'center', 'margin-top': '40px'}}>
                <h3>Training model ...</h3>
            </div>
        </div>
    ) 

    renderStartPredicting = () => { 
        const predict = this.props.classifier && this.props.classifier.handlePredict
        const { history } = this.props

        return (
            <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <h3>Model ready!</h3>
                <img src="https://cdn.dribbble.com/users/130603/screenshots/2291004/rebeldarth_01.gif" alt="use the force" width="400px" />
                <div style={{textAlign: 'center', marginTop: '40px'}}>
                    <button onClick={() => {
                        predict()
                        history.push('/')
                    }}> START USING "THE FORCE" </button>
                </div>
            </div> )
    }

    render() {
        const { classifier, trainingState } = this.props
        const { isGettingExamples, countdownSeconds } = this.state
        const labels = this.props.classifier && this.props.classifier.CONTROLS
        const train = this.props.classifier && this.props.classifier.train

        return (
            <Fragment>
                { classifier &&  
                <Fragment>
                    { !this.areSamplesReady() && trainingState === 'no-trained' && (
                        <styled.GetExamplesButtons>
                            { labels.map((label, index) => (
                                <styled.ExampleWrapper key={label} isGettingExamples={isGettingExamples}>
                                    <Icon glyph={`${this.mapIcon[label]}`} color="papayawhip" size="80"/>
                                    <div>
                                        <canvas width="224" height="224" id={`${label}-thumb`}></canvas>
                                    </div>
                                    <button onClick={() => this.handleGetExamples(index, label)} disabled={isGettingExamples} >
                                        { isGettingExamples ? `Getting samples - ${countdownSeconds}` : `Get ${label} samples`}
                                    </button>
                                </styled.ExampleWrapper>
                            ))}
                        </styled.GetExamplesButtons>
                    )}
                    
                    { (this.areSamplesReady() || trainingState !== 'no-trained') &&  (
                        <styled.TrainingButtons>
                            { trainingState === 'no-trained' && (
                                <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                                    <h3>Samples are ready, lets train the model</h3>
                                    <button onClick={train}> TRAIN </button>
                                </div>
                            )}
                            { trainingState === 'training' && this.renderLoaders() }
                            { trainingState === 'finished' && this.renderStartPredicting() }
                        </styled.TrainingButtons>
                    )}
                </Fragment> }
            </Fragment>
           
    )
    }
}

export default withRouter(TrainingMenu)