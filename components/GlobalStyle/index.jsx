import { createGlobalStyle } from 'styled-components';
import theme from '../../utils/theme';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html, body {
        font-size: 14px;
        font-family: ${props => props.theme.fonts.spartan};
    }

    /* main {
        width: 100vw;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    } */
`;

export default GlobalStyle;