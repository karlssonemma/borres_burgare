import styled from 'styled-components';
import React from 'react';

const StyledInput = styled.input`
    width: auto;
    padding: .5em;
    margin: .3em 0;
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
    formRef,
    height
}) {

    return(
        <>
            <StyledLabel htmlFor={inputId}>{labelText}</StyledLabel>
            <StyledInput 
                type={inputType}
                placeholder={inputPlaceholder}
                id={inputId}
                name={inputName}
                ref={formRef}
                value={inputValue}
                style={{height: height}}
            />
        </>
    )
}

export default InputField;