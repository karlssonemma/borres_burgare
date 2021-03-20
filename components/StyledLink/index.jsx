import styled from 'styled-components';

const StyledLink = styled.a`
    display: block;
    cursor: pointer;
    font-size: ${props => props.theme.fontSizes.m};
    & :hover {
        color: green;
    }
    & :active {
        color: blue;
    }
`;

export default StyledLink;