import React from 'react'
import Logo from '../Images/Logo'
import * as styled from './styled'

const Header = () => (
    <styled.HeaderWrapper>
        <styled.LogoWrapper>
            <Logo />
            <span>Planets</span>
        </styled.LogoWrapper>
        <styled.FakeWebcam>
            Fake webcam
        </styled.FakeWebcam>
    </styled.HeaderWrapper>
)

export default Header