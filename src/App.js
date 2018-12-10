import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './Header'
import * as styled from './styled.js'
import Logo from './Images/Logo'
import Webcam from './Webcam'
import PlanetsMenu from './PlanetsMenu'
import PlanetCard from './PlanetCard'
import TrainingMenu from './TrainingMenu'
import Classifier from './Classifier'
 
class App extends Component {
  state = { 
    data: null,
    planets: null,
    pageNumber: 1
  }

  componentDidMount = async () => {
     const response = await fetch('https://swapi.co/api/planets/')
     const data = await response.json()
     const { pageNumber } = this.state
     const planets = this.groupResultsByPageNumber(pageNumber, data.results)

     this.setState({planets, data})
  }

  nextPage = () => {
    const { pageNumber, data } = this.state

    if(pageNumber < 3){
      this.setState(prevState => ({
        pageNumber: prevState.pageNumber + 1,
        planets: this.groupResultsByPageNumber(prevState.pageNumber + 1, data.results)
      }))
    }
  }

  previousPage = () => {
    const { pageNumber, data } = this.state
    
    if(pageNumber > 1){
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
   
      for(let i = from; i < to; i++) {
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
                nextPage={this.nextPage}
                previousPage={this.previousPage}
                {...this.state}
              />)} 
            />
            <Route path="/planet/:name" component={PlanetCard} />
            <Route path="/train" component={() => <TrainingMenu labels={['one', 'two', 'three', 'left', 'right']} />} />
          </Switch>
        </Router>
        <Classifier webcam={this.webcam} />
      </styled.AppWrapper>
    );
  }
}

export default App;
