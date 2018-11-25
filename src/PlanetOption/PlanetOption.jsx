import React from 'react'
import Icon from '../Images/Icon'
import * as styled from './styled'

const mapOptions = {
    '1': 'one',
    '2': 'two',
    '3': 'three'
}

const PlanetOption = ({ name, option }) => (
    <styled.PlanetOptionWrapper>
        <img src={`${process.env.PUBLIC_URL}/img/${name}.png`} alt={name}/>
        <h3>{name}</h3>
        <Icon glyph={`${mapOptions[option]}-fingers`} color="papayawhip" size="80"/>
    </styled.PlanetOptionWrapper>
)

export default PlanetOption