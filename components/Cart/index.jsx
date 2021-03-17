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
import TextAreaField from '../../components/TextAreaField';
import { useRouter } from 'next/router';
import { ExtraSpan } from '../../components/ExtraSpan';
import { CountBtn } from '../CountBtn';

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


    const handleDelete = (item) => {
        basket.deleteProduct(item);
    };

    const handleOrder = () => {

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
            comment: comment
        })
        .then(() => {
            basket.deleteBasket([]);
            setComment('');
            router.push('/profile')
        })
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
                            <StyledItem style={{display: 'flex'}} key={Math.random()}>
                                <div>
                                    <p>{item.count} x {item.title} {item.patty}</p>
                                    {
                                        item.extras && item.extras.map(item => <ExtraSpan>{'+ ' + item}</ExtraSpan>)
                                    }
                                </div>
                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                    <span>{item.total} NOK</span>
                                    {/* <StyledBtn onClick={() => handleDelete(item)}>
                                        x
                                    </StyledBtn> */}
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '.5em'}}>
                                        <CountBtn onClick={() => handleAddCount(item)}>+</CountBtn>
                                        <span>{item.count}</span>
                                        <CountBtn onClick={() => handleSubCount(item)}>-</CountBtn>
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
                            inputType='textarea' 
                            inputId='comment' 
                            inputName='comment' 
                            labelText='Comment'
                            height='50px'
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