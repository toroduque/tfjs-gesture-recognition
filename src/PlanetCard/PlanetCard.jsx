import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../Images/Icon'
import * as styled from './styled'

function createPlanetTable(planet) {
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

const PlanetCard = ({location}) => {
    const { planet } = location.state

    return (
    <Fragment>
        <styled.PlanetCardWrapper>
        <styled.LeftColumn>
            <styled.PlanetName>
                {planet && planet.name}
            </styled.PlanetName>
            <styled.PlanetTable>   
                {   
                    planet && createPlanetTable(planet)
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
        <Link to="/">
            <styled.BackButton>
                <Icon glyph="thumb-left" color="papayawhip" size="80" />
                <p>Back</p>
            </styled.BackButton>
        </Link>
    </styled.NavigationWrapper>
</Fragment>)}

export default PlanetCard