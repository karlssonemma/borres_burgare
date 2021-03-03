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

function InputField({ 
    inputType, 
    inputPlaceholder, 
    labelText, 
    inputName, 
    inputId, 
    inputChangeHandler,
    refHandler,
    inputValue
}) {

    return(
        <>
            <StyledLabel htmlFor={inputId}>{labelText}</StyledLabel>
            <StyledInput 
                type={inputType}
                placeholder={inputPlaceholder}
                id={inputId}
                name={inputName}
                // onChange={e => inputChangeHandler(e)}
                ref={refHandler}
                value={inputValue}
            />
        </>
    )
}

export default InputField;