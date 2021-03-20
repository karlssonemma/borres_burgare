import React, { useEffect, useState, useRef } from 'react';
import firebaseInstance from '../config/firebase';
import { Container } from '../components/Container';
import ModifyCard from '../components/ModifyCard';
import Cart from '../components/Cart';
import styled from 'styled-components';
import { useBasket } from '../contexts/BasketContext';
import ProductCard from '../components/ProductCard';
import { ProductGrid } from '../components/ProductGrid';
import theme from '../utils/theme';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import StyledLink from '../components/StyledLink';
import Nav from '../components/Nav';

const StyledMain = styled.main`
    padding: 1em;
    width: 100vw;
    display: grid;
    grid-template-columns: 17% auto;

    @media screen and (min-width: ${props => props.theme.breakpoints[2]}) {
        grid-template-columns: max-content auto 20vw;
    }
    /* @media screen and (min-width: ${props => props.theme.breakpoints[1]}) {
        grid-template-columns: 20% auto;
    } */
`;



function OrderPage() {
    const router = useRouter();
    const { login, currentUser, isAuthenticated } = useAuth();
    const basket = useBasket();
    const [chosen, setChosen] = useState(null);
    const [burgers, setBurgers] = useState(null);
    const [activeMenu, setActiveMenu] = useState(null);
    const [extras, setExtras] = useState(null);
    const [patties, setPatties] = useState(null);
    
    const menuColl = firebaseInstance.firestore().collection('burgers');
    const extrasColl = firebaseInstance.firestore().collection('extras');
    const pattiesColl = firebaseInstance.firestore().collection('patties');


    if(!isAuthenticated) {
        router.push('/login')
        return <p>You're not signed in</p>
    };

    console.log(isAuthenticated);

    useEffect(() => {
        if(activeMenu === null && burgers !== null) {
            setActiveMenu(burgers);
        }
    }, [burgers])

    useEffect(() => {  
        if (burgers === null) {
            let menuArr = [];
            menuColl.get()
            .then(query => {
                query.forEach(doc => {
                    menuArr.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })
            setBurgers(menuArr)
            })
        }
    }, [])


    useEffect(() => {  
        if (extras === null) {
            let extrasArr = [];
            extrasColl.get()
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

    useEffect(() => {  
        if (patties === null) {
            let pattiesArr = [];
            pattiesColl.get()
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
       if(e.target.text === 'Fries') {
           let tempArr = burgers.filter(item => item.category === 'fries');
           setActiveMenu(tempArr);
       }
       if(e.target.text === 'Burgers') {
        let tempArr = burgers.filter(item => item.category === 'burger');
        setActiveMenu(tempArr);
       }
       if(e.target.text === 'Drinks') {
        let tempArr = burgers.filter(item => item.category === 'drink');
        setActiveMenu(tempArr);
       }
   };

   const handleSetChosen = (item) => {
    setActiveMenu(null);
    setChosen(item);
   };

   
    return(
        <>
        <Nav />
        <StyledMain>
            <Container>
                <StyledLink style={{paddingBottom: '.3em'}} onClick={e => setMenu(e)}>Burgers</StyledLink>
                <StyledLink style={{paddingBottom: '.3em'}} onClick={e => setMenu(e)}>Fries</StyledLink>
                <StyledLink style={{paddingBottom: '.3em'}} onClick={e => setMenu(e)}>Drinks</StyledLink>
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