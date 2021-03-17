import React from 'react';
import styled from 'styled-components';
import theme from '../../utils/theme';
import { StyledBtn } from '../../components/StyledBtn';
import CartProduct from '../CartProduct';

function OldOrderItem({ item }) {

const StyledSection = styled.section`
    width: 100%;
    padding: 1em;
    background-color: ${props => props.theme.colors.gray};
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

    return(
        <StyledSection>
            <div>
            {
                item.order.map(item => {
                    return(
                        <CartProduct item={item} />
                    )
                })
            }
            </div>
            <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                {item.timeOfOrder && <p>{item.timeOfOrder.date}</p>}
                <StyledBtn>Order again</StyledBtn>
            </div>
        </StyledSection>
    )
};

export default OldOrderItem;