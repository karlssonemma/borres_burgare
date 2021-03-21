import React from 'react';
import { ExtraSpan } from '../Text/ExtraSpan';


function CartProduct({ item }) {

    return(
        <>
            <p style={{marginBottom: '1em'}}>{item.count} x {item.title} {item.patty}
            {
                item.extras && item.extras.map(item => {
                    return(
                        <ExtraSpan>+ {item}</ExtraSpan>
                    )
                })
            }</p>
        </>
    )
};

export default CartProduct;