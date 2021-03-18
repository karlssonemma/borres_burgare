import styled from 'styled-components';
import theme from '../../../utils/theme';

export const StyledBtn = styled.button`
    width: max-content;
    padding: 1em;
    margin: .5em 0;
    font-size: ${props => props.theme.fontSizes.s};
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: ${props => props.theme.colors.buttons.orange.background};
    color: ${props => props.theme.colors.buttons.orange.text};
    font-family: ${props => props.theme.fonts.spartan};

    &:hover {
        background-color: ${props => props.theme.colors.buttons.orange.hover.background};
        color: ${props => props.theme.colors.buttons.orange.hover.text};
    };

    &.cart-btn {
        z-index: 10; 
        position: relative;
        display: inline-block;

        @media screen and (min-width: ${props => props.theme.breakpoints[2]}) {
            display: none;
        }
    }
`;