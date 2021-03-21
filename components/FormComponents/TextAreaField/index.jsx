import styled from 'styled-components';
import React from 'react';

const StyledInput = styled.textarea`
    max-width: 100%;
    min-width: 100%;
    padding: .5em;
    margin: .3em 0;
    background-color: #eeeeee;
    border: none;
    border-radius: 5px;
    display: block;
`;

const StyledLabel = styled.label`
    font-size: .8rem;
    margin-top: 1em;
`;

function TextAreaField({ 
    labelText, 
    inputName, 
    inputId,
    formRef,
    handleChange
}) {

    return(
        <>
            <StyledLabel htmlFor={inputId}>{labelText}</StyledLabel>
            <StyledInput 
                id={inputId}
                name={inputName}
                ref={formRef}
                onChange={e => handleChange(e)}
                rows='3'
                col='1'
            />
        </>
    )
}

export default TextAreaField;