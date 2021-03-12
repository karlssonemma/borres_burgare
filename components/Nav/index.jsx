import styled from 'styled-components';
import React from 'react'; 
import { PageTitle } from '../PageTitle';
import { StyledBtn } from '../../components/StyledBtn';

const StyledNav = styled.nav`
    height: 100px;
    width: 100%;
    padding: 0 1em;
    background-color: lightgray;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

function Nav() {

const findEl = () => {
    let cart = document.querySelector('.cart');
    cart.classList.toggle('show-cart');
};

    return(
        <StyledNav>
            <PageTitle>BB</PageTitle>
            <div>
                <StyledBtn>Log Out</StyledBtn>
                <StyledBtn onClick={() => findEl()} className='cart-btn'>Cart</StyledBtn>
            </div>
        </StyledNav>
    )
}

export default Nav;