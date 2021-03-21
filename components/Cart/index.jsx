import React, { useState } from 'react';
import styled from 'styled-components';
import { StyledBtn } from '../Buttons/StyledBtn';
import { useBasket } from '../../contexts/BasketContext';
import { SecondaryTitle } from '../Text/SecondaryTitle';
import { Container } from '../Container';
import { ThirdTitle } from '../Text/ThirdTitle';
import firebaseInstance from '../../config/firebase';
import { useAuth } from '../../contexts/AuthContext';
import TextAreaField from '../FormComponents/TextAreaField';
import { useRouter } from 'next/router';
import { CountBtn } from '../Buttons/CountBtn';
import CartProduct from '../CartProduct';

const StyledItem = styled.li`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin: 1.5em 0;
    
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
    

    return(
        <Container className='cart'>
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
                        <ThirdTitle style={{marginTop: '1em'}}>Total: {basket.total}</ThirdTitle>
                        <StyledBtn className='order-btn' style={{width: '100%'}} onClick={() => handleOrder()}>Order</StyledBtn>
                    </>
            }
            
            </div>
        </Container>
    )
}

export default Cart;