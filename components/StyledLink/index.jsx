import styled from 'styled-components';

const StyledLink = styled.a`
    display: block;
    cursor: pointer;
    font-size: ${props => props.theme.fontSizes.m};
    & :hover {
        color: ${props => props.theme.colors.green};
    }
`;

export default StyledLink;