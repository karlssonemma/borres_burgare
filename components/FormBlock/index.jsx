import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
    width: max-content;
    height: max-content;
    padding: 2em;
    border-radius: 10px;
    background-color: lightblue;
    display: flex;
    flex-direction: column;

    /* & button {
        align-self: center;
    } */
`;

function FormBlock({ formAction, formMethod, formId, formName, children }) {

    return(
        <StyledForm 
            action={formAction} 
            method={formMethod} 
            name={formName} 
            id={formId} 
        >
            {children}
        </StyledForm>
    )
}

export default FormBlock;