import styled from 'styled-components'

export const ExampleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 400px;
    justify-content: space-around;

    button {
        padding: 10px;
        border-radius: 4px;
        background-color: ${ props => props.isGettingExamples ? '#f92c5c' : '#6b41f4' };
        border: none;
        color: white;
        font-family: Helvetica;
        font-size: 15px;
        text-transform: capitalize;
        cursor: ${ props => props.isGettingExamples ? 'none' : 'pointer' };;
        transition: 0.2s;

        &:hover {
            background-color: ${ props => props.isGettingExamples ? '#f92c5c' : '#1098f4' };
        }
    }
`

export const GetExamplesButtons = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
`

export const TrainingButtons = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
    font-size: 18px;

    button {
        padding: 15px 40px;
        border-radius: 4px;
        border: none;
        font-size: 18px;
        background-color: #884597;
        color: white;
        cursor: pointer;

        &:hover {
            background-color: #7664b8; 
        }
    }
`

export const LoadersWrapper = styled.div`
    display: flex;
    width: 40%;
    justify-content: space-around;
`