import styled from 'styled-components';
import React, { useEffect, useState } from 'react'; 
import { PageTitle } from '../Text/PageTitle';
import { StyledBtn } from '../Buttons/StyledBtn';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/router'; 
import Link from 'next/link';
import StyledLink from '../../components/StyledLink';
import theme from '../../utils/theme';
import { useBasket } from '../../contexts/BasketContext';

const StyledNav = styled.nav`
    height: 15vh;
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
const StyledImg = styled.img`
    height: 1.4rem;
    position: relative;
    top: 4px;
    margin-left: .6em;
`;

const CartBtn = styled(StyledBtn)`
    background-color: transparent;
    padding: 1em;
    margin-left: 1em;
    color: black;

    &:hover {
        color: black;
    }
`;

function Nav() {

const basket = useBasket();
const router = useRouter();
const { logout, isAuthenticated } = useAuth();
const [numberOfProducts, setNumberOfProducts] = useState(0);

useEffect(() => {
    let number = basket.products.reduce((prev, cur) => {
        return prev + cur.count;
    }, 0)
    setNumberOfProducts(number);
}, [basket.products])

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
            <FlexDiv>
                {
                    isAuthenticated && 
                        <>
                            <Link href='/profile'>
                                <StyledLink>Profile</StyledLink>
                            </Link>
                            <Link href='/order'>
                                <StyledLink>Order</StyledLink>
                            </Link>
                            <StyledBtn onClick={() => handleSignOut()}>Log Out</StyledBtn>
                            {
                                router.asPath === '/order' && <CartBtn onClick={() => findEl()} className='cart-btn'>{numberOfProducts !== 0 && numberOfProducts}<StyledImg src='/shopping-cart.png'/></CartBtn>
                            }
                        </>
                }
            </FlexDiv>
        </StyledNav>
    )
}

export default Nav;