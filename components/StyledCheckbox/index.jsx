import React from 'react';
import styled from 'styled-components';
// import check from './img/check.png';

const StyledInput = styled.input`
    position: absolute;
    opacity: 0;
    cursor: pointer;

    &:checked ~ span {
        background-image: url(./img/check);
        background-size: fill;
        /* background-color: yellow; */
    }
`;

const StyledLabel = styled.label`
    padding-top: 1em;
    padding-left: 2em;
    display: block;
    position: relative;
    cursor: pointer;

    /* & :hover ~ span {
        background-color: pink;
    } */
`;

const StyledRadioBtn = styled.span`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #d8d8d8;
    position: absolute;
    bottom: 0;
    left: 0;
    border: 1px solid black;

`;

function StyledCheckbox({ inputValue, inputName, formRef }) {


    return(
        <>
            <StyledLabel>{inputValue}
                <StyledInput 
                    type='checkbox' 
                    name={inputName} 
                    value={inputValue} 
                    ref={formRef}
                    id={inputValue}
                />
                    <StyledRadioBtn />
            </StyledLabel>
        </>
    )
}

export default StyledCheckbox;