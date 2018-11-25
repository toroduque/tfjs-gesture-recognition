import React, { Component } from 'react';
import Header from './Header'
import Pagination from './Pagination'
import { AppWrapper } from './styled.js'
 
class App extends Component {
  state = { 
    data: null,
    pageNumber: 1
  }

  componentDidMount = async () => {
     const results = await fetch('https://swapi.co/api/planets/')
     const data = await results.json()

     this.setState({data})
  }

  render() {
    // Debuging comment
    console.log('this.state.data', this.state.data)

    const { pageNumber } = this.state
    
    return (
      <AppWrapper>
        <Header />
        <h1>Planets go here</h1>
        <Pagination pageNumber={pageNumber}/>
      </AppWrapper>
    );
  }
}

export default App;
