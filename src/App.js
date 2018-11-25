import React, { Component } from 'react';
import Header from './Header'
import Pagination from './Pagination'
import * as styled from './styled.js'
import PlanetOption from './PlanetOption';
 
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
    const { pageNumber, planets } = this.state
    
    return (
      <styled.AppWrapper>
        <Header />
        <styled.PlanetsWrapper>
            { planets && planets.map((planet, index) => <PlanetOption name={planet.name} option={index + 1} />) }
        </styled.PlanetsWrapper>
        <Pagination pageNumber={pageNumber} nextPage={this.nextPage} previousPage={this.previousPage}/>
      </styled.AppWrapper>
    );
  }
}

export default App;
