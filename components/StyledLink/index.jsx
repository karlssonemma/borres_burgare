import styled from 'styled-components';

const StyledLink = styled.a`
    display: block;
    cursor: pointer;
    font-size: ${props => props.theme.fontSizes.lg};
    & :hover {
        color: green;
    }
`;

export default StyledLink;