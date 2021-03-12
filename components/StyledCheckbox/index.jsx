import React from 'react';
import styled from 'styled-components';
// import check from './img/check.png';
import theme from '../../utils/theme';

const StyledInput = styled.input`
    position: absolute;
    opacity: 0;
    cursor: pointer;

    &:checked ~ .check {
        background-image: url('/check.png');
        background-size: 15px;
        background-position: center;
        background-repeat: no-repeat;
        /* background-color: yellow; */
    }
`;

const StyledLabel = styled.label`
    position: relative;
    cursor: pointer;
    height: 40px;
    display: flex;
    align-items: center;
    font-size: ${props => props.theme.fontSizes.m};

    /* & :hover ~ span {
        background-color: pink;
    } */
`;

const StyledRadioBtn = styled.span`
    width: 25px;
    height: 25px;
    margin: 1em;
    border-radius: 50%;
    background-color: #d8d8d8;
    position: absolute;
    right: 0;
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