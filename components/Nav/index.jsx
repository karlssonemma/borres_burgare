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
    height: 120px;
    width: 100%;
    padding: 0 ${props => props.theme.space[5]};
    background-color: ${props => props.theme.colors.gray};
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 10;
`;

const FlexDiv = styled.div`
    display: flex;
    align-items: center;

    & a {
        padding-right: ${props => props.theme.space[3]};
    }
`;
const StyledImg = styled.img`
    height: ${props => props.theme.space[4]};
    position: relative;
    top: 4px;
    margin-left: ${props => props.theme.space[1]};
`;

const CartBtn = styled(StyledBtn)`
    padding: ${props => props.theme.space[3]};
    color: black;

    &:hover {
        color: black;
    }
`;

const MenuLink = styled(StyledLink)`
    padding-right: .8em;
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
            basket.setProducts([]);
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
                                    <MenuLink>Profile</MenuLink>
                                </Link>
                                <Link href='/order'>
                                    <MenuLink>Order</MenuLink>
                                </Link>
                                <MenuLink onClick={() => handleSignOut()}>Log Out</MenuLink>
                                {
                                    router.asPath === '/order' && <CartBtn onClick={() => findEl()} className='cart-btn'>{numberOfProducts !== 0 ? numberOfProducts : 0}<StyledImg src='/shopping-cart.png'/></CartBtn>
                                }
                            </>
                    }
                </FlexDiv>
            </StyledNav>
        )
}

export default Nav;