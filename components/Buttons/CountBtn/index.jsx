import styled from 'styled-components';
import theme from '../../../utils/theme';

export const CountBtn = styled.button`
    width: 20px;
    padding: .2em .5em;
    background-color: ${props => props.theme.colors.buttons.green.background};
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: ${props => props.theme.colors.buttons.green.hover.background};
    }
`;