import React, { useEffect, useState, useRef } from 'react';
import firebaseInstance from '../config/firebase';
import { Container } from '../components/Container';
import readCollection from '../database/readCollection';
import MenuItemCard from '../components/MenuItemCard';
import Cart from '../components/Cart';
import styled from 'styled-components';

const StyledMain = styled.main`
    margin-top: 1em;
    width: 100vw;
    display: grid;
    grid-template-columns: 10% auto 20%;
`;

const StyledLink = styled.a`
    display: block;
    cursor: pointer;
`;


function OrderPage({ arr }) {

    const [cart, setCart] = useState([]);
    const [comment, setComment] = useState('');
    const burgers = [...arr];
    const [fries, setFries] = useState(null);
    const [activeMenu, setActiveMenu] = useState(burgers);

    const currentCart = firebaseInstance.firestore().collection('cart');
    const friesColl = firebaseInstance.firestore().collection('fries');

    useEffect(() => {
        let friesArr = [];
        friesColl.get()
        .then(query => {
            query.forEach(doc => {
                friesArr.push({
                    id: doc.id,
                    ...doc.data()
                })
            });
            console.log(friesArr);
            setFries(friesArr);
        })
    }, [])

    useEffect(() => {
        let data = localStorage.getItem('cart');
        let returned = JSON.parse(data);
        if (data) {
            setCart(returned);
        };    
    }, [])

    useEffect(() => {
        let cartString = JSON.stringify(cart);
        localStorage.setItem('cart', cartString);
    }, [cart])


    function addItem(id, item) {
        let tempCart = [...cart];
        let tempProducts = [...activeMenu];
        let tempItem = tempCart.find(el => el.id === id && el.chosen_patty === item.chosen_patty);
        if (!tempItem) {
            tempItem = tempProducts.find(el => el.id === id && el.chosen_patty === item.chosen_patty);
            let newItem = {
                            ...tempItem, 
                            count: 1, 
                            total: tempItem.price
                          }
            tempCart.push(newItem);
            setCart(tempCart);
        } else {
            let index = tempCart.indexOf(tempItem);
            tempCart.splice(index, 1);
            let newCount = tempItem.count += 1;
            let newItem = {
                            ...tempItem, 
                            count: newCount,
                            total: tempItem.price * newCount
                          }
            tempCart.push(newItem);
            setCart(tempCart);
        }
    };

    function removeItem(id) {
        let tempCart = [...cart];
        let tempItem = tempCart.find(item => item.id === id);
        if(tempItem) {
            let index = tempCart.indexOf(tempItem);
            tempCart.splice(index, 1)
        };
        setCart([...tempCart]);
        currentCart.doc(id).delete()
    };

    function handleComment(e) {
        setComment(e.target.value);
    };

   function changePat(e, item) {
       console.log(e.target.value)
       item.chosen_patty = e.target.value;
       console.log(item)
   };

   function setMenu(e) {
       if(e.target.text === 'Fries') {
           setActiveMenu(fries)
       }
       if(e.target.text === 'Burgers') {
           setActiveMenu(burgers)
       }
   };

    return(
        <StyledMain>
            <Container>
                <StyledLink onClick={e => setMenu(e)}>Burgers</StyledLink>
                <StyledLink onClick={e => setMenu(e)}>Fries</StyledLink>
            </Container>
            <Container style={{borderLeft: '1px solid black', borderRight: '1px solid black'}}>
                {
                   activeMenu && activeMenu.map(item => {
                        return(
                            <MenuItemCard
                                handleChange={(e) => changePat(e, item)}
                                onBtnClickHandler={() => addItem(item.id, item)}
                                // item={item}
                                key={item.id}
                                itemTitle={item.title}
                                price={item.price}
                                description={item.description}
                                allergens={item.allergens}
                                patty={item.patty}
                            />
                        )
                    })
                }
                {/* {
                    fries && fries.map(item => {
                        return(
                            <MenuItemCard 
                                onBtnClickHandler={() => addItem(item.id, item)}
                                key={item.id}
                                itemTitle={item.title}
                                price={item.price}
                                description={item.description}
                                allergens={item.allergens}
                            />
                        )
                    })
                } */}
            </Container>
            <Container>
                <Cart 
                    cart={cart}
                    onBtnClickHandler={item => removeItem(item.id)}
                    inputChangeHandler={e => handleComment(e)}
                />
            </Container>
        </StyledMain>
    )
}

OrderPage.getInitialProps = async () => {
    try {
        const collection = await firebaseInstance.firestore().collection('burgers');
        const dataCollection = await collection.get();

        const arr = [];

        dataCollection.forEach(burg => {
            arr.push({
                id: burg.id,
                ...burg.data()
            });
        });
        
        return { arr }

    } catch (error) {
        return {
            error: error.message
        };
    };
};


export default OrderPage;