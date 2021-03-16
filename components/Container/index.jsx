import styled from 'styled-components';
import theme from '../../utils/theme';

export const Container = styled.section`
    width: auto;
    height: auto;
    padding: 1.5em;
    display: block;
    /* border-radius: 10px; */

    &.cart {
        display: none;
    };

    &.show-cart {
        display: flex !important;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: green;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
    };


    @media screen and (min-width: ${props => props.theme.breakpoints[2]}) {
        display: block !important;
    }
`;
