import styled from 'styled-components';
import theme from '../../utils/theme';

export const SecondaryTitle = styled.h2`
    font-size: ${props => props.theme.fontSizes.xl};
    margin-bottom: ${props => props.theme.space[1]};

    &.product-card-title {
        display: flex;
        justify-content: space-between;
    }
`;