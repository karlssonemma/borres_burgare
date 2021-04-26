import styled from 'styled-components';
import React from 'react';
import theme from '../../../utils/theme';

const StyledInput = styled.input`
    width: auto;
    padding: ${props => props.theme.space[1]};
    margin: ${props => props.theme.space[0]} 0;
    background-color: white;
    border: none;
    border-radius: 5px;
    display: block;
`;

const StyledLabel = styled.label`
    font-size: .8rem;
    padding-top: .2em;
`;

function InputField({ 
    inputType, 
    inputPlaceholder, 
    labelText, 
    inputName, 
    inputId, 
    inputValue, 
    register,
    height
}) {

    return(
        <>
            <StyledLabel htmlFor={inputId}>{labelText}</StyledLabel>
            <StyledInput 
                type={inputType}
                placeholder={inputPlaceholder}
                id={inputId}
                value={inputValue}
                style={{height: height}}
                {...register(inputName)}
            />
        </>
    )
}

export default InputField;