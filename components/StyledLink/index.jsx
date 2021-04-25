import styled from 'styled-components';
import theme from '../../utils/theme';

const StyledLink = styled.button`
    min-width: max-content;
    /* padding-right: 1em; */
    display: block;
    cursor: pointer;
    font-size: ${props => props.theme.fontSizes.s};
    font-family: ${props => props.theme.fonts.spartan};
    background-color: transparent;
    border: none;
    
    & :hover {
        color: ${props => props.theme.colors.green};
    }

    @media screen and (min-width: ${props => props.theme.breakpoints[1]}) {
        font-size: ${props => props.theme.fontSizes.m};
    }
`;

export default StyledLink;