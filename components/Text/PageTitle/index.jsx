import styled from 'styled-components';
import theme from '../../../utils/theme';

export const PageTitle = styled.h1`
    font-size: ${props => props.theme.fontSizes.l};
    font-family: ${props => props.theme.fonts.spartan};

    @media screen and (min-width: ${props => props.theme.breakpoints[1]}) {
        font-size: ${props => props.theme.fontSizes.xl};
    }
`;