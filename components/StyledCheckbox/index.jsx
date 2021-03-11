import React from 'react';
import styled from 'styled-components';
// import check from './img/check.png';

const StyledInput = styled.input`
    position: absolute;
    opacity: 0;
    cursor: pointer;

    &:checked ~ .check {
        background-image: url(./img/check);
        background-size: fill;
        background-color: yellow;
    }
`;

const StyledLabel = styled.label`
    position: relative;
    cursor: pointer;
    height: 40px;
    display: flex;
    align-items: center;

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
    right: 0;
    border: 1px solid black;

`;

const StyledInputText = styled.span`
    width: auto;
`;

function StyledCheckbox({ inputValue, inputName, formRef, inputType, price }) {


    return(
        <>
            <StyledLabel>
                <StyledInputText>{inputValue}</StyledInputText>
                <StyledInput 
                    type={inputType} 
                    name={inputName} 
                    value={inputValue} 
                    ref={formRef}
                    id={inputValue}
                />
                {
                    price && <span>{'+' + price}</span>
                }
                <StyledRadioBtn className='check' />
            </StyledLabel>
        </>
    )
}

export default StyledCheckbox;