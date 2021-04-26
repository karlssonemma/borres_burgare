import styled from 'styled-components';
import React from 'react';
import theme from '../../../utils/theme';

const StyledInput = styled.textarea`
    max-width: 100%;
    min-width: 100%;
    padding: ${props => props.theme.space[1]};
    margin: ${props => props.theme.space[0]} 0;
    background-color: #eeeeee;
    border: none;
    border-radius: 5px;
    display: block;
`;

const StyledLabel = styled.label`
    font-size: ${props => props.theme.space[3]};
    margin-top: ${props => props.theme.space[3]};
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