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


function OrderPage({ extrasArr }) {

    const [chosen, setChosen] = useState(null);
    const [cart, setCart] = useState([]);
    const [comment, setComment] = useState('');
    const [burgers, setBurgers] = useState(null);
    // const burgers = [...menuArr];
    const extras = [...extrasArr];
    const [fries, setFries] = useState(null);
    const [activeMenu, setActiveMenu] = useState(null);
    const [checkedExtras, setCheckedExtras] = useState(null);

    const currentCart = firebaseInstance.firestore().collection('cart');
    const friesColl = firebaseInstance.firestore().collection('fries');
    const menuColl = firebaseInstance.firestore().collection('burgers');


    // useEffect(() => {
    //     let friesArr = [];
    //     friesColl.get()
    //     .then(query => {
    //         query.forEach(doc => {
    //             friesArr.push({
    //                 id: doc.id,
    //                 ...doc.data()
    //             })
    //         });
    //         console.log(friesArr);
    //         setFries(friesArr);
    //     })
    // }, [])


    useEffect(() => {
        let menuArr = [];
        menuColl.get()
        .then(query => {
            query.forEach(doc => {
                menuArr.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            setBurgers(menuArr);
        });
    }, [])

    useEffect(() => {
        setActiveMenu(burgers);
    }, [burgers])

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

        let tempItem = tempCart.find(el => el.id === id && el.chosen_patty === item.chosen_patty && JSON.stringify(el.extras) === JSON.stringify(checkedExtras));
        if (!tempItem) {
            tempItem = tempProducts.find(el => el.id === id && el.chosen_patty === item.chosen_patty);
            console.log(tempItem)
            let newItem = {
                            ...tempItem, 
                            count: 1, 
                            total: tempItem.price,
                            extras: checkedExtras
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
                            total: tempItem.price * newCount,
                            extras: checkedExtras
                          }
            tempCart.push(newItem);
            setCart(tempCart);
        }
        setChosen(null);
        setCheckedExtras(null);
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

   function changeExtras(e, item) {
    let tempChecked = checkedExtras;
    if (e.target.checked) {
        if (!tempChecked) {
            let newExtra = extras.find(item => item.title === e.target.name);
            setCheckedExtras([newExtra]);
        } else {
            let newExtra = extras.find(item => item.title === e.target.name);
            setCheckedExtras([...tempChecked, newExtra]);
        };
    } else {
        let newChecked = tempChecked.find(item => item.title === e.target.name);
        let index = tempChecked.indexOf(newChecked);
        tempChecked.splice(index, 1);
        setCheckedExtras([...tempChecked]);
    };
   

    // console.log(e.target.checked)
    // item.extras = e.target.name;
    console.log(item)
    // console.log(e.target.value)
   };

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


    return(
        <StyledMain>
            <Container>
                <StyledLink onClick={e => setMenu(e)}>Burgers</StyledLink>
                <StyledLink onClick={e => setMenu(e)}>Fries</StyledLink>
                <StyledLink onClick={e => setMenu(e)}>Drinks</StyledLink>
            </Container>
            <Container style={{borderLeft: '1px solid black', borderRight: '1px solid black'}}>
                {
                    chosen && 
                        <MenuItemCard
                            handleChange={(e) => changePat(e, chosen)}
                            onBtnClickHandler={() => addItem(chosen.id, chosen)}
                            // item={item}
                            key={chosen.id}
                            itemTitle={chosen.title}
                            price={chosen.price}
                            description={chosen.description}
                            allergens={chosen.allergens}
                            patty={chosen.patty}
                            category={chosen.category}
                            extras={extras}
                            handleExtras={e => changeExtras(e, chosen)}
                        />
                }
                {
                   activeMenu && activeMenu.map(item => {
                        return(
                            <p onClick={() => setChosen(item)}>{item.title}</p>
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
        // const collection = await firebaseInstance.firestore().collection('burgers');
        // const menuCollection = await collection.get();
        const collection2 = await firebaseInstance.firestore().collection('extras');
        const extrasCollection = await collection2.get();

        // const menuArr = [];

        // menuCollection.forEach(item => {
        //     menuArr.push({
        //         id: item.id,
        //         ...item.data()
        //     });
        // });

        const extrasArr = [];

        extrasCollection.forEach(item => {
            extrasArr.push({
                id: item.id,
                ...item.data()
            });
        });
        
        return { extrasArr }

    } catch (error) {
        return {
            error: error.message
        };
    };
};


export default OrderPage;