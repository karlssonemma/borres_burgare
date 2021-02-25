import styled from 'styled-components';
import React from 'react';

const StyledBtn = styled.button`
    width: max-content;
    padding: 1em;
    margin: .5em 0;
    font-size: .8rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

function Btn({ 
    btnText, 
    btnType, 
    onBtnClickHandler, 
    setDisabled 
}) {

    return(
        <>
        {
            setDisabled 
            ?
            <StyledBtn onClick={() => onBtnClickHandler()} type={btnType} disabled>{btnText}</StyledBtn>
            :
            <StyledBtn onClick={() => onBtnClickHandler()} type={btnType}>{btnText}</StyledBtn>
        }
        </>
    )
}

export default Btn;