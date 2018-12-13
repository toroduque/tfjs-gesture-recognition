import styled from 'styled-components'

export const ExampleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    button {
        padding: 10px;
        border-radius: 4px;
        background-color: #6b41f4;
        border: none;
        color: white;
        font-family: Helvetica;
        font-size: 15px;
        text-transform: capitalize;
        cursor: pointer;
        transition: 0.2s;

        &:hover {
            background-color: #1098f4;
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
        margin-right: 30px;
        padding: 10px;
    }
`