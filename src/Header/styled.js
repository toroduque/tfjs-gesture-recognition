import styled from 'styled-components'

export const HeaderWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    span {
        margin: 10px 0;
        font-size: 30px;
        font-weight: 400;
    }
`

export const LogoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

// TEMORARY
export const FakeWebcam = styled.div`
    width: 150px;
    height: 150px;
    background: gray;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`