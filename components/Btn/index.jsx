import styled from 'styled-components';

const StyledBtn = styled.button`
    width: max-content;
    padding: 1em;
    margin: .5em 0;
    font-size: .8rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

function Btn({ btnText, btnType }) {

    return(
        <StyledBtn type={btnType}>{btnText}</StyledBtn>
    )
}

export default Btn;