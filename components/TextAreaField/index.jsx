import styled from 'styled-components';
import React from 'react';

const StyledInput = styled.input`
    width: auto;
    padding: .5em;
    margin: .3em 0;
    background-color: #eeeeee;
    border: none;
    border-radius: 5px;
    display: block;
`;

const StyledLabel = styled.label`
    font-size: .8rem;
`;

function TextAreaField({ 
    inputType, 
    labelText, 
    inputName, 
    inputId,
    formRef,
    height,
    handleChange
}) {

    return(
        <>
            <StyledLabel htmlFor={inputId}>{labelText}</StyledLabel>
            <StyledInput 
                type={inputType}
                id={inputId}
                name={inputName}
                ref={formRef}
                style={{height: height}}
                onChange={e => handleChange(e)}
            />
        </>
    )
}

export default TextAreaField;