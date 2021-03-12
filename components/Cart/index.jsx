import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import InputField from '../InputField';
import { StyledBtn } from '../../components/StyledBtn';
import { useBasket } from '../../contexts/BasketContext';
import { SecondaryTitle } from '../../components/SecondaryTitle';
import { Container } from '../../components/Container';
import { ThirdTitle } from '../../components/ThirdTitle';

function Cart({ cart, onBtnClickHandler, inputChangeHandler }) {

    const basket = useBasket();

    const handleDelete = (item) => {
        basket.deleteProduct(item);
    };

    return(
        <Container className='cart'>
            <SecondaryTitle>Your Order</SecondaryTitle>
            {
                (basket.products.length > 0) 
                    ? basket.products.map(item => {
                        return(
                            <section key={Math.random()}>
                                <p>{item.count} x {item.title} {item.patty}</p>
                                {
                                    item.extras && item.extras.map(item => <p>{'+ ' + item}</p>)
                                }
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
            <StyledBtn>Order</StyledBtn>
        </Container>
    )
}

export default Cart;