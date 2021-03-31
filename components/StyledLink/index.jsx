import styled from 'styled-components';
import theme from '../../utils/theme';

const StyledLink = styled.a`
    min-width: max-content;
    display: block;
    cursor: pointer;
    font-size: ${props => props.theme.fontSizes.s};
    & :hover {
        color: ${props => props.theme.colors.green};
    }

    @media screen and (min-width: ${props => props.theme.breakpoints[1]}) {
        font-size: ${props => props.theme.fontSizes.m};
    }
`;

export default StyledLink;