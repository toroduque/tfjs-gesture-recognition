import React from 'react'
import { Link } from 'react-router-dom'
import Icon from '../Images/Icon'
import * as styled from './styled'

const mapOptions = {
    '1': 'one',
    '2': 'two',
    '3': 'three'
}

const PlanetOption = ({ option, planet }) => (
    <styled.PlanetOptionWrapper>
        <img src={`${process.env.PUBLIC_URL}/img/${planet.name}.png`} alt={planet.name}/>
        <h3>{planet.name}</h3>
        
        <Link to={{ pathname: `/planet/${planet.name}`, state: { planet }}} >
            <Icon glyph={`${mapOptions[option]}-fingers`} color="papayawhip" size="80"/>
        </Link>
    </styled.PlanetOptionWrapper>
)

export default PlanetOption