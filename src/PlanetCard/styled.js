import styled from 'styled-components'

export const PlanetCardWrapper = styled.div`
    display: flex;
    margin: 0 170px;
`

export const PlanetName = styled.h2`
font-size: 26px;
`

export const PlanetTable = styled.div`
    font-family: "Cinzel";
    font-size: 22px;
    margin: 50px 0;

    p {
        margin: 5px;;
    }
`

export const LeftColumn = styled.div`
    flex: 1;
`

export const RightColumn = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const BackButton = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: none;
    outline: none;
    background: black;
    
    p { 
        color: white; 
        font-size: 22px;
    }
`

export const NavigationWrapper = styled.div`
    display: flex;
    justify-content: center;
    border-top: solid 1px gray;
    padding: 40px;
`