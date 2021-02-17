import styled from 'styled-components';

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

function InputField({ inputType, inputPlaceholder, labelText, inputName, inputId }) {

    return(
        <>
            <StyledLabel htmlFor={inputId}>{labelText}</StyledLabel>
            <StyledInput 
                type={inputType}
                placeholder={inputPlaceholder}
                id={inputId}
                name={inputName}
            />
        </>
    )
}

export default InputField;