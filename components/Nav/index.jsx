import styled from 'styled-components';
import React from 'react'; 
import { PageTitle } from '../Text/PageTitle';
import { StyledBtn } from '../Buttons/StyledBtn';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/router'; 
import Link from 'next/link';
import StyledLink from '../../components/StyledLink';
import theme from '../../utils/theme';

const StyledNav = styled.nav`
    height: 100px;
    width: 100%;
    padding: 0 3em;
    background-color: ${props => props.theme.colors.gray};
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const FlexDiv = styled.div`
    display: flex;
    align-items: center;

    & a {
        padding-right: 1em;
    }
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
            <PageTitle>Børres Burgare</PageTitle>
            <FlexDiv>
                {
                    isAuthenticated && 
                        <>
                            <Link href='/profile'>
                                <StyledLink>Your Profile</StyledLink>
                            </Link>
                            <Link href='/order'>
                                <StyledLink>Order</StyledLink>
                            </Link>
                            <StyledBtn onClick={() => handleSignOut()}>Log Out</StyledBtn>
                        </>
                }
                <StyledBtn onClick={() => findEl()} className='cart-btn'>Cart</StyledBtn>
            </FlexDiv>
        </StyledNav>
    )
}

export default Nav;