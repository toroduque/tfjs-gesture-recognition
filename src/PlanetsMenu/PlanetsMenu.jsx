import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import Pagination from '../Pagination'
import PlanetOption from '../PlanetOption';
import * as styled from './styled'

class PlanetsMenu extends Component {
    handleSelectedOption = (selectedOption) => {
        const { planets } = this.props

        if(selectedOption === 'left') this.props.previousPage()
        if(selectedOption === 'right') this.props.nextPage()
        if(selectedOption === 'one') this.props.history.push({ pathname: `/planet/${planets[0].name}`, state: { planet: planets[0] }})
        if(selectedOption === 'two') this.props.history.push({ pathname: `/planet/${planets[1].name}`, state: { planet: planets[1] }})
        if(selectedOption === 'three') this.props.history.push({ pathname: `/planet/${planets[2].name}`, state: { planet: planets[2] }})
    }

    render() {
        const { pageNumber, planets, selectedOption } = this.props

        return (
            <Fragment>
                {this.handleSelectedOption(selectedOption)}
                 <styled.PlanetsWrapper>
                { planets && planets.map((planet, index) => <PlanetOption  key={planet.name} planet={planet} option={index + 1} />) }
                </styled.PlanetsWrapper>
                <Pagination pageNumber={pageNumber} nextPage={this.props.nextPage} previousPage={this.props.previousPage}/>
            </Fragment>
        )
    }
}

export default withRouter(PlanetsMenu)