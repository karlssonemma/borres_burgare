import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import InputField from '../InputField';

function Cart({ cart }) {

    const [total, setTotal] = useState(0);

    useEffect(() => {
        let amount = 0;
        if (cart !== null) {

            for (let i = 0; i < cart.length; i++) {

                cart[i].quantity > 1 
                    ? amount += cart[i].quantity * cart[i].price
                    : amount += cart[i].price
            };
        };
       setTotal(amount);
    }, [cart])

    return(
        <section>
            <h3>Your Order</h3>
            {
                cart && cart.map(item => {
                    return(
                        <p key={Math.random()}>{item.quantity} x {item.title}</p>
                    )
                })
            }
            <InputField inputType='text' inputId='comment' inputName='comment' labelText='Comment' />
            <h3>Total: {total}</h3>
        </section>
    )
}

export default Cart;