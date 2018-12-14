import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Icon from '../Images/Icon'
import * as styled from './styled'
class PlanetCard extends Component {

    
    createPlanetTable(planet) {
        const excludedProperties = ['name', 'residents', 'films', 'created', 'edited', 'url']
        const tableProperties = Object.keys(planet).map(prop => {
            if(!excludedProperties.includes(prop)) {
                return prop
            }
        })
    
        return tableProperties.map(prop => {
            const formatedProp = prop && prop.replace('_', ' ')
            return prop && <p key={prop}>{formatedProp}: {planet[prop]}</p>}
        )
    }

    handleSelectedOption = (selectedOption) => {
        if(selectedOption === 'left') this.props.history && this.props.history.goBack()
    }

    render() {
        const planet  = this.props.location && this.props.location.state.planet

        console.log('this.props', this.props)

        return (
            <Fragment>
                { this.handleSelectedOption(this.props.selectedOption) }
                <styled.PlanetCardWrapper>
                <styled.LeftColumn>
                    <styled.PlanetName>
                        {planet && planet.name}
                    </styled.PlanetName>
                    <styled.PlanetTable>   
                        {   
                            planet && this.createPlanetTable(planet)
                        }
                    </styled.PlanetTable>
                </styled.LeftColumn>
                <styled.RightColumn>
                {
                    planet &&
                    <img src={`${process.env.PUBLIC_URL}/img/${planet.name}.png`} alt={planet.name}/> 
                }
                </styled.RightColumn>  
            </styled.PlanetCardWrapper>
            <styled.NavigationWrapper>
                <styled.BackButton onClick={this.props.history.goBack}>
                    <Icon glyph="thumb-left" color="papayawhip" size="80" />
                    <p>Back</p>
                </styled.BackButton>
            </styled.NavigationWrapper>
        </Fragment>)
    }
 }

export default withRouter(PlanetCard)