import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import debounce from 'lodash.debounce'
import throttle from 'lodash.throttle'
import * as styled from './styled.js'
import Logo from './Images/Logo'
import Webcam from './Webcam'
import PlanetsMenu from './PlanetsMenu'
import PlanetCard from './PlanetCard'
import Classifier from './Classifier'
import TrainingMenu from './TrainingMenu/index.js';
 
class App extends Component {
    constructor() {
        super()
        this.updateSelectedOption = throttle(this.updateSelectedOption, 1000)
        this.nextPageThrottle =  throttle(this.nextPage, 3000)
    }

  state = { 
      data: null,
      planets: null,
      pageNumber: 1,
      selectedOption: null
  }

  componentDidMount = async () => {
      const response = await fetch('https://swapi.co/api/planets/')
      const data = await response.json()
      const { pageNumber } = this.state
      const planets = this.groupResultsByPageNumber(pageNumber, data.results)

      this.setState({planets, data})
  }

  updateSelectedOption = (selectedOption) => this.setState((prevState => {
      if(prevState.selectedOption !== selectedOption) {
          return { selectedOption }
      }
  }))
  

  nextPage = () => {
      const { pageNumber, data } = this.state

      if (pageNumber < 3) {
          this.setState(prevState => ({
              pageNumber: prevState.pageNumber + 1,
              planets: this.groupResultsByPageNumber(prevState.pageNumber + 1, data.results)
          }))
      }
  }

  previousPage = () => {
      const { pageNumber, data } = this.state
      
      if (pageNumber > 1) {
          this.setState(prevState => ({
              pageNumber: prevState.pageNumber - 1,
              planets: this.groupResultsByPageNumber(prevState.pageNumber - 1, data.results)
          }))
      }
  }

  groupResultsByPageNumber(pageNumber, results) {
      const to = pageNumber * 3
      const from = to - 3

      const groupedResults = []
   
      for (let i = from; i < to; i++) {
          groupedResults.push(results[i])
      }

      return groupedResults
  }

  render() {
    return (
      <styled.AppWrapper>
        <styled.HeaderWrapper>
            <styled.LogoWrapper>
                <Logo />
                <span>Planets</span>
            </styled.LogoWrapper>
            <Webcam onRef={ref => (this.webcam = ref)} />
        </styled.HeaderWrapper>
        <Router>
          <Switch>
            <Route path="/" exact component={() => (
              <PlanetsMenu
                  nextPage={this.nextPageThrottle}
                  previousPage={this.previousPage}
                  selectedOption={this.state.selectedOption}
                  pageNumber={this.state.pageNumber}
                  planets={this.state.planets}
              />)} 
            />
            <Route path="/planet/:name" component={() => <PlanetCard selectedOption={this.state.selectedOption}/>} />
            <Route path="/training" component={() => (
              <TrainingMenu classifier={this.classifier}/>
            )} />
          </Switch>
        </Router>
        <Classifier webcam={this.webcam} onRef={ref => (this.classifier = ref)} updateSelectedOption={this.updateSelectedOption}/>
      </styled.AppWrapper>
    );
  }
}

export default App;
