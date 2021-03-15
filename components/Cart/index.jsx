import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import InputField from '../InputField';
import { StyledBtn } from '../../components/StyledBtn';
import { useBasket } from '../../contexts/BasketContext';
import { SecondaryTitle } from '../../components/SecondaryTitle';
import { Container } from '../../components/Container';
import { ThirdTitle } from '../../components/ThirdTitle';
import firebaseInstance from '../../config/firebase';
import { useAuth } from '../../contexts/AuthContext';

function Cart({ onBtnClickHandler, inputChangeHandler }) {

    const basket = useBasket();
    const currentCart = firebaseInstance.firestore().collection('orders_in_process');
    const { currentUser } = useAuth();


    const handleDelete = (item) => {
        basket.deleteProduct(item);
    };

    const handleOrder = () => {
        currentCart.doc().set({
            customer: currentUser.uid,
            order: basket.products,
            finished: false,
            pickedUp: false
        })
        .then(() => {
            basket.deleteBasket([]);
        })
    };

    return(
        <Container className='cart'>
            <SecondaryTitle>Your Order</SecondaryTitle>
            {
                (basket.products.length > 0) 
                    ? basket.products.map(item => {
                        return(
                            <section style={{display: 'flex'}} key={Math.random()}>
                                <div>
                                    <p>{item.count} x {item.title} {item.patty}</p>
                                    {
                                        item.extras && item.extras.map(item => <p>{'+ ' + item}</p>)
                                    }
                                </div>
                                <StyledBtn onClick={() => handleDelete(item)}>
                                    Remove
                                </StyledBtn>
                            </section>
                        )
                    })
                    : <p>Empty</p>
            }
            <InputField 
                inputType='text' 
                inputId='comment' 
                inputName='comment' 
                labelText='Comment'
                inputChangeHandler={e => inputChangeHandler(e)}
            />
            <ThirdTitle>Total: {basket.total}</ThirdTitle>
            <StyledBtn style={{width: '100%'}} onClick={() => handleOrder()}>Order</StyledBtn>
        </Container>
    )
}

export default Cart;