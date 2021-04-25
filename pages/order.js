import React, { useEffect, useState, useRef } from 'react';
import firebaseInstance from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { useBasket } from '../contexts/BasketContext';
import theme from '../utils/theme';
import { readCollection } from '../database/firebaseHelpers';

import { Container } from '../components/Container';
import ModifyCard from '../components/ModifyCard';
import Cart from '../components/Cart';
import styled from 'styled-components';
import ProductCard from '../components/ProductCard';
import { ProductGrid } from '../components/ProductGrid';
import StyledLink from '../components/StyledLink';
import Nav from '../components/Nav';

const StyledMain = styled.main`
    padding: 1em;
    width: 100vw;
    display: grid;
    grid-template-columns: 80px auto;

    @media screen and (min-width: ${props => props.theme.breakpoints[2]}) {
        grid-template-columns: 110px auto 20vw;
    }
    
`;



function OrderPage() {
    const router = useRouter();
    const { login, currentUser, isAuthenticated } = useAuth();
    const basket = useBasket();
    const [chosen, setChosen] = useState(null);
    const [menuItems, setMenuItems] = useState(null);
    const [activeMenu, setActiveMenu] = useState(null);
    const [extras, setExtras] = useState(null);
    const [patties, setPatties] = useState(null);

    if(!isAuthenticated) {
        router.push('/login')
        return <p>You're not signed in</p>
    };

    useEffect(() => {
        if(activeMenu === null && menuItems !== null) {
            let tempArr = menuItems.filter(item => item.category === 'burger');
            setActiveMenu(tempArr);
        }
    }, [menuItems])

    useEffect(async () => {  
        if (menuItems === null) {
            let menuArr = [];
            let coll = await readCollection('burgers')
            coll.get()
            .then(query => {
                query.forEach(doc => {
                    menuArr.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })
            setMenuItems(menuArr)
            })
        }
    }, [])

    useEffect(async () => {  
        if (extras === null) {
            let extrasArr = [];
            let coll = await readCollection('extras')
            coll.get()
            .then(query => {
                query.forEach(doc => {
                    extrasArr.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })
            setExtras(extrasArr)
            })
        }
    }, [])

    useEffect(async () => {  
        if (patties === null) {
            let pattiesArr = [];
            let coll = await readCollection('patties')
            coll.get()
            .then(query => {
                query.forEach(doc => {
                    pattiesArr.push({
                        id: doc.id,
                        ...doc.data()
                    })
                });           
            setPatties(pattiesArr)
            })
        }
    }, [])


   function setMenu(e) {
       setChosen(null);
       if(e.target.innerHTML === 'Fries') {
        setActiveMenu(menuItems.filter(item => item.category === 'fries'))
       }
       if(e.target.innerHTML === 'Burgers') {
        setActiveMenu(menuItems.filter(item => item.category === 'burger'))
       }
       if(e.target.innerHTML === 'Drinks') {
        setActiveMenu(menuItems.filter(item => item.category === 'drink'))
       }
   };

   const handleSetChosen = (item) => {
    console.log('clicked')
    setActiveMenu(null);
    setChosen(item);
   };

   
    return(
        <>
        <Nav />
        <StyledMain>
            <Container>
                <StyledLink style={{paddingBottom: '1em'}} onClick={e => setMenu(e)}>Burgers</StyledLink>
                <StyledLink style={{paddingBottom: '1em'}} onClick={e => setMenu(e)}>Fries</StyledLink>
                <StyledLink style={{paddingBottom: '1em'}} onClick={e => setMenu(e)}>Drinks</StyledLink>
            </Container>
            <ProductGrid>
                {
                    activeMenu && activeMenu.map(item => {
                        return(
                           <ProductCard 
                                product={item}
                                key={item.id}
                                onBtnClick={() => handleSetChosen(item)}
                           />
                        )
                    })
                }
                {
                    (activeMenu === null && chosen) && <ModifyCard extras={extras} patties={patties} menu_item={chosen} />
                }
            </ProductGrid>
            <Cart />
        </StyledMain>
        </>
    )
};

export default OrderPage;