import styled from 'styled-components';
import theme from '../../utils/theme';

export const Container = styled.section`
    width: auto; 
    height: auto;
    padding: 1.5em;
    display: block;
    

    &.cart {
        display: none;
    };

    &.show-cart {
        display: flex !important;
        flex-direction: column;
        align-items: center;
        background-color: white;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        min-height: 100vh;
        padding-top: 160px;
    };


    @media screen and (min-width: ${props => props.theme.breakpoints[1]}) {
        display: block !important;
    }
`;
