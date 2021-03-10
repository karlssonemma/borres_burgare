import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import InputField from '../InputField';
import { StyledBtn } from '../../components/StyledBtn';
import { useBasket } from '../../contexts/BasketContext';

function Cart({ cart, onBtnClickHandler, inputChangeHandler }) {

    const basket = useBasket();

    const handleDelete = (item) => {
        basket.deleteProduct(item);
    };

    return(
        <section>
            <h3>Your Order</h3>
            {
                (basket.products !== null) 
                    ? basket.products.map(item => {
                        return(
                            <section key={Math.random()}>
                                <p>{item.count} x {item.title} {item.chosen_patty}</p>
                                {/* {
                                    item.extras && item.extras.map(item => <p>{item.title}</p>)
                                } */}
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
            <h3>Total: {basket.total}</h3>
        </section>
    )
}

export default Cart;