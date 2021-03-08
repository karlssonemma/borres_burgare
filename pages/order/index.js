import React, { useEffect, useState, useRef } from 'react';
import firebaseInstance from '../../config/firebase';
import { Container } from '../../components/Container';
import readCollection from '../../database/readCollection';
import MenuItemCard from '../../components/MenuItemCard';
import Cart from '../../components/Cart';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

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

const StyledP = styled.p`
    &.chosen {
        color: blue;
    }
`;


function OrderPage({ menuArr }) {

    const { register, handleSubmit, errors } = useForm();

    const [chosen, setChosen] = useState(null);
    const [cart, setCart] = useState([]);
    const [comment, setComment] = useState('');
    // const [burgers, setBurgers] = useState(null);
    const burgers = [...menuArr];
    const [extras, setExtras] = useState(null);
    const [activeMenu, setActiveMenu] = useState(burgers);
    // const [checkedExtras, setCheckedExtras] = useState(null);
    const [addOns, setAddOns] = useState(null);
    

    const currentCart = firebaseInstance.firestore().collection('cart');
    const menuColl = firebaseInstance.firestore().collection('burgers');
    const extrasColl = firebaseInstance.firestore().collection('extras');

    const onSubmit = (data) => {
        console.log(data);
        setAddOns(data)
    };

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
            console.log('updated extra state')
            })
        }
    }, [])

    // useEffect(() => {
    //     let menuArr = [];
    //     menuColl.get()
    //     .then(query => {
    //         query.forEach(doc => {
    //             menuArr.push({
    //                 id: doc.id,
    //                 ...doc.data()
    //             });
    //         });
    //         setBurgers(menuArr);
    //     });
    // }, [])

    // useEffect(() => {
    //     setActiveMenu(burgers);
    // }, [burgers])

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

    const addItem = async (id, item) => {
        
        let checkedExtras = addOns;
        
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
        setAddOns(null);
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
                {/* {
                    <MenuItemCard
                        // item={item}
                        menu_item={chosen}
                        extras={extras}
                        runSubmit={handleSubmit(onSubmit)}
                        formRef={register}
                        handleClick={() => addItem(chosen.id, chosen)}
                        key={chosen.id}
                    />
                } */}
                {
                    activeMenu && activeMenu.map(item => {
                        return(
                           <Link href={'/order/' + item.id} key={item.id}>
                                <a>{item.title}</a>
                           </Link>
                        )
                    })
                }
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
        const menuCollection = await collection.get();
        // const collection2 = await firebaseInstance.firestore().collection('extras');
        // const extrasCollection = await collection2.get();

        const menuArr = [];

        menuCollection.forEach(item => {
            menuArr.push({
                id: item.id,
                ...item.data()
            });
        });

        // const extrasArr = [];

        // extrasCollection.forEach(item => {
        //     extrasArr.push({
        //         id: item.id,
        //         ...item.data()
        //     });
        // });
        
        return { menuArr }

    } catch (error) {
        return {
            error: error.message
        };
    };
};


export default OrderPage;