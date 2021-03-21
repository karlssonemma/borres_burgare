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
`;

export default GlobalStyle;