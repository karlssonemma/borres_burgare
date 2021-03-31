import React, { useState } from 'react';
import styled from 'styled-components';
import { StyledBtn } from '../Buttons/StyledBtn';
import { useBasket } from '../../contexts/BasketContext';
import { SecondaryTitle } from '../Text/SecondaryTitle';
import { ThirdTitle } from '../Text/ThirdTitle';
import firebaseInstance from '../../config/firebase';
import { useAuth } from '../../contexts/AuthContext';
import TextAreaField from '../FormComponents/TextAreaField';
import { useRouter } from 'next/router';
import { CountBtn } from '../Buttons/CountBtn';
import CartProduct from '../CartProduct';
import Image from 'next/image'

const StyledCart = styled.section`
    width: auto; 
    height: auto;
    padding: 1.5em;
    display: block;
    
    &.cart {
        display: none;
    };

    &.show-cart {
        display: flex !important;
        flex-direction: column;
        align-items: center;
        background-color: white;
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        min-height: 100vh;
        padding-top: 160px;
        z-index: 10;
    };

    &.close_btn {
        display: block;
    }

    @media screen and (min-width: ${props => props.theme.breakpoints[1]}) {
        display: block !important;

        &.close_btn {
            display: none;
        }
    }
`;

const StyledItem = styled.li`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin: 1.5em 0;
`;

const CloseBtn = styled(StyledBtn)`
    position: absolute;
    top: 2em;
    right: 3em;
`;


function Cart() {

    const router = useRouter();
    const basket = useBasket();
    const currentCart = firebaseInstance.firestore().collection('orders_in_process');
    const { currentUser } = useAuth();
    const [comment, setComment] = useState('');


    const handleOrder = () => {

        let newCount;

        let countRef = firebaseInstance.firestore().collection('globals').doc('counter');
        firebaseInstance.firestore().runTransaction(transaction => {
            return transaction.get(countRef)
            .then(doc => {
                newCount = doc.data().count + 1;
                if(newCount > 999) {
                    newCount = 1;
                }
                transaction.update(countRef, { count: newCount })
            })
            .then(() => {
                currentCart.doc().set({
                    customer: currentUser.uid,
                    order: basket.products,
                    finished: false,
                    pickedUp: false,
                    accepted: false,
                    timeOfOrder: {
                        date: new Date().toLocaleDateString(),
                        time: new Date().toLocaleTimeString(),
                    },
                    comment: comment,
                    orderNr: newCount
                })
            })
            .then(() => {
                basket.deleteBasket([]);
                setComment('');
                router.push('/profile')
            })
        });
    };

    const handleAddCount = (item) => {
        basket.addToCount(item)
    };

    const handleSubCount = (item) => {
        basket.subCount(item)
    };

    const handleClose = () => {
        let cart = document.querySelector('.cart');
        cart.classList.toggle('show-cart');
    };

    return(
        <StyledCart className='cart'>
            <CloseBtn className='close_btn' onClick={handleClose}>
                <Image 
                    src='/cancel.png'
                    width={15}
                    height={15}
                />
            </CloseBtn>
            <div style={{width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <SecondaryTitle>Your Order</SecondaryTitle>
            <ul>
            {
                (basket.products.length > 0)
                    ? basket.products.map(item => {
                        return(
                            <StyledItem style={{display: 'flex'}} key={Math.random() * 1000}>
                                <CartProduct item={item} key={Math.floor(Math.random() * 1000)} />
                                <div>
                                    <span>{item.total} NOK</span>
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '.5em'}}>
                                        <CountBtn onClick={() => handleSubCount(item)}>-</CountBtn>
                                        <span>{item.count}</span>
                                        <CountBtn onClick={() => handleAddCount(item)}>+</CountBtn>
                                    </div>
                                </div>
                            </StyledItem>
                        )
                    })
                    : <p>Empty</p>
            }
            </ul>
            {
                (basket.products.length > 0) && 
                    <>
                        <TextAreaField 
                            inputId='comment' 
                            inputName='comment' 
                            labelText='Comment'
                            handleChange={e => setComment(e.target.value)}
                        />
                        <ThirdTitle style={{marginTop: '1em'}}>Total: {basket.total} NOK</ThirdTitle>
                        <StyledBtn className='order-btn' style={{width: '100%'}} onClick={() => handleOrder()}>Order</StyledBtn>
                    </>
            }
            
            </div>
        </StyledCart>
    )
}

export default Cart;