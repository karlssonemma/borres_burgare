import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import InputField from '../InputField';
import Btn from '../Btn';

function Cart({ cart, onBtnClickHandler }) {

    const [total, setTotal] = useState(0);

    useEffect(() => {
        let amount = 0;
        if (cart !== null) {

            for (let i = 0; i < cart.length; i++) {

                cart[i].count > 1 
                    ? amount += cart[i].count * cart[i].price
                    : amount += cart[i].price
            };
        };
       setTotal(amount);
       console.log('updated')
    }, [cart])


    return(
        <section>
            <h3>Your Order</h3>
            {
                (cart !== null) 
                    ? cart.map(item => {
                        return(
                            <section key={Math.random()}>
                                <p>{item.count} x {item.title}</p>
                                <Btn btnText='X' onBtnClickHandler={() => onBtnClickHandler(item)} />
                            </section>
                        )
                    })
                    : <p>Empty</p>
            }
            <InputField inputType='text' inputId='comment' inputName='comment' labelText='Comment' />
            <h3>Total: {total}</h3>
        </section>
    )
}

export default Cart;