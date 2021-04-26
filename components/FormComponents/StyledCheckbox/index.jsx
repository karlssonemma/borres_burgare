import React from 'react';
import styled from 'styled-components';
// import check from './img/check.png';
import theme from '../../../utils/theme';

const StyledInput = styled.input`
    position: absolute;
    opacity: 0;
    cursor: pointer;

    &:checked ~ .check {
        background-image: url('/check.png');
        background-size: 15px;
        background-position: center;
        background-repeat: no-repeat;
    }
`;

const StyledLabel = styled.label`
    position: relative;
    cursor: pointer;
    height: 40px;
    display: flex;
    align-items: center;
    font-size: ${props => props.theme.fontSizes.m};
`;

const StyledRadioBtn = styled.span`
    width: 25px;
    height: 25px;
    margin: ${props => props.theme.space[3]};
    border-radius: 50%;
    background-color: #d8d8d8;
    position: absolute;
    right: 0;
`;

const StyledInputText = styled.span`
    width: auto;
    font-size: ${props => props.theme.fontSizes.s};
`;

const PriceSpan = styled.span`
    position: absolute;
    right: 50px;
    top: 14px;
    color: gray;
    font-size: ${props => props.theme.fontSizes.xs};
`;

function StyledCheckbox({ 
    inputValue, 
    inputName, 
    inputType, 
    price, 
    id, 
    req, 
    register }) {


    return(
        <>
            <StyledLabel tabIndex={0} htmlFor={id}>
                <StyledInputText>{inputValue}</StyledInputText>
                <StyledInput 
                    type={inputType} 
                    value={inputValue} 
                    id={id}
                    className={inputName}
                    checked={req}
                    tabIndex={0}
                    {...register(inputName)}
                />
                {
                    price && <PriceSpan>{'+' + price}</PriceSpan>
                }
                <StyledRadioBtn className='check' />
                
            </StyledLabel>
        </>
    )
}

export default StyledCheckbox;