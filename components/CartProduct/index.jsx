import React from 'react';
import styled from 'styled-components';
import { ExtraSpan } from '../ExtraSpan';

const StyledSection = styled.section`
    margin: 1em 0;
`;

function CartProduct({ item }) {

    return(
        <StyledSection>
            <p>{item.count} x {item.title}</p>
            {
                item.extras && item.extras.map(item => {
                    return(
                        <ExtraSpan>+ {item}</ExtraSpan>
                    )
                })
            }
        </StyledSection>
    )
};

export default CartProduct;