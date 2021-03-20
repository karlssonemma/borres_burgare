import React from 'react';
import styled from 'styled-components';
import { ExtraSpan } from '../Text/ExtraSpan';

// const StyledSection = styled.section`
//     margin-bottom: 1em;
// `;

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