import styled from 'styled-components';
import theme from '../../utils/theme';

export const StyledBtn = styled.button`
    width: max-content;
    padding: 1em;
    margin: .5em 0;
    font-size: ${props => props.theme.fontSizes.s};
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: ${props => props.theme.colors.buttons.background};
    color: ${props => props.theme.colors.buttons.text};
`;