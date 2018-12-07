import React, { Component, Fragment } from 'react'
import Pagination from '../Pagination'
import PlanetOption from '../PlanetOption';
import * as styled from './styled'

class PlanetsMenu extends Component {
    render() {
        const { pageNumber, planets } = this.props

        return (
            <Fragment>
                 <styled.PlanetsWrapper>
                { planets && planets.map((planet, index) => <PlanetOption  key={planet.name} planet={planet} option={index + 1} />) }
                </styled.PlanetsWrapper>
                <Pagination pageNumber={pageNumber} nextPage={this.props.nextPage} previousPage={this.props.previousPage}/>
            </Fragment>
        )
    }
}

export default PlanetsMenu