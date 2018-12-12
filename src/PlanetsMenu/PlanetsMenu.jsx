import React, { Component, Fragment } from 'react'
import Pagination from '../Pagination'
import PlanetOption from '../PlanetOption';
import * as styled from './styled'

class PlanetsMenu extends Component {
    handleSelectedOption = () => {
        const { selectedOption } = this.props

        if(selectedOption === 'left') this.props.previousPage()
        if(selectedOption === 'right') this.props.nextPage()
    }


    render() {
        const { pageNumber, planets, selectedOption } = this.props

        console.log('selectedOption', selectedOption)

        return (
            <Fragment>
                {this.handleSelectedOption()}
                 <styled.PlanetsWrapper>
                { planets && planets.map((planet, index) => <PlanetOption  key={planet.name} planet={planet} option={index + 1} />) }
                </styled.PlanetsWrapper>
                <Pagination pageNumber={pageNumber} nextPage={this.props.nextPage} previousPage={this.props.previousPage}/>
            </Fragment>
        )
    }
}

export default PlanetsMenu