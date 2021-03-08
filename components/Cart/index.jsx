import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import InputField from '../InputField';
import Btn from '../Btn';

function Cart({ cart, onBtnClickHandler, inputChangeHandler }) {

    const [total, setTotal] = useState(0);

    useEffect(() => {
        let amount = 0;
        if (cart !== null) {
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].count) {
                    amount += cart[i].count * cart[i].price
                } else {
                    amount += cart[i].price
                };
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
                                <p>{item.count} x {item.title} {item.chosen_patty}</p>
                                {/* {
                                    item.extras && item.extras.map(item => <p>{item.title}</p>)
                                } */}
                                <Btn btnText='X' onBtnClickHandler={() => onBtnClickHandler(item)} />
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
            <h3>Total: {total}</h3>
        </section>
    )
}

export default Cart;