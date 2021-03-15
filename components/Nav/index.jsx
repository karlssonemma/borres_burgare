import styled from 'styled-components';
import React from 'react'; 
import { PageTitle } from '../PageTitle';
import { StyledBtn } from '../../components/StyledBtn';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/router'; 
import Link from 'next/link';

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

const router = useRouter();
const { logout, isAuthenticated } = useAuth();

const handleSignOut = async () => {
    try {
        await logout();
        router.push('/login');
    } catch(error) {
        console.log('ERROR', error);
    }
};

const findEl = () => {
    let cart = document.querySelector('.cart');
    cart.classList.toggle('show-cart');
};

    return(
        <StyledNav>
            <PageTitle>BB</PageTitle>
            <div>
                {
                    isAuthenticated && 
                        <>
                            <Link href='/profile'>
                                <a>Your Profile</a>
                            </Link>
                            <Link href='/order'>
                                <a>Order</a>
                            </Link>
                            <StyledBtn onClick={() => handleSignOut()}>Log Out</StyledBtn>
                        </>
                }
                <StyledBtn onClick={() => findEl()} className='cart-btn'>Cart</StyledBtn>
            </div>
        </StyledNav>
    )
}

export default Nav;