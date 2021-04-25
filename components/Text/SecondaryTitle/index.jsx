import styled from 'styled-components';
import theme from '../../../utils/theme';

export const SecondaryTitle = styled.h2`
    font-size: ${props => props.theme.fontSizes.m};
    margin-bottom: ${props => props.theme.space[1]};

    &.product-card-title {
        display: flex;
        justify-content: space-between;
    }

    @media screen and (min-width: ${props => props.theme.breakpoints[1]}) {
        font-size: ${props => props.theme.fontSizes.l};
    }
`;