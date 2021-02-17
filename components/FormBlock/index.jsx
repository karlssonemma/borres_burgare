import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
width: 60vw;
height: max-content;
padding: 2em;
border-radius: 10px;
background-color: lightblue;
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