import React from 'react'
import Logo from '../Images/Logo'
import Webcam from '../Webcam'
import * as styled from './styled'

const Header = () => (
    <styled.HeaderWrapper>
        <styled.LogoWrapper>
            <Logo />
            <span>Planets</span>
        </styled.LogoWrapper>
        <Webcam />
        {/* <styled.FakeWebcam>
            Fake webcam
        </styled.FakeWebcam> */}
    </styled.HeaderWrapper>
)

export default Header