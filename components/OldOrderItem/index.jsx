import React from 'react';
import styled from 'styled-components';
import theme from '../../utils/theme';
import { StyledBtn } from '../../components/StyledBtn';
import CartProduct from '../CartProduct';
import { useBasket } from '../../contexts/BasketContext';
import firebaseInstance from '../../config/firebase';

const StyledSection = styled.li`
    width: 100%;
    padding: 1em;
    background-color: ${props => props.theme.colors.gray};
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

function OldOrderItem({ item }) {

    const basket = useBasket();
    const ordersInProcess = firebaseInstance.firestore().collection('orders_in_process');

    const handleOrder = (item) => {
        ordersInProcess.doc(item.id).set({
            ...item,
            finished: false,
            pickedUp: false, 
            accepted: false
        })
    };

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
                <StyledBtn onClick={() => handleOrder(item)}>Order again</StyledBtn>
            </div>
        </StyledSection>
    )
};

export default OldOrderItem;