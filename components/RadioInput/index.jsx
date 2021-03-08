import styled from 'styled-components';
import React, { useState } from 'react';

const StyledInput = styled.input`
    position: absolute;
    opacity: 0;
    cursor: pointer;

    &:checked ~ span {
        /* background-image: url('/img/check.png'); */
        background-color: yellow;
    }
`;

const StyledLabel = styled.label`
    padding-left: 2em;
    display: block;
    position: relative;
    cursor: pointer;

    /* & :hover ~ span {
        background-color: pink;
    } */
`;

const StyledRadioBtn = styled.span`
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #d8d8d8;
    position: absolute;
    top: 0;
    left: 0;
`;

function RadioInput({ radioValue, radioName, formRef }) {


    return(
        <>
            <StyledLabel>{radioValue}
                <StyledInput 
                    type='radio' 
                    name={radioName} 
                    value={radioValue} 
                    ref={formRef}
                />
                    <StyledRadioBtn />
            </StyledLabel>
        </>
    )
}

export default RadioInput;