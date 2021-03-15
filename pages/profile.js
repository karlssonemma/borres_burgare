import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import firebaseInstance from '../config/firebase';
import { SecondaryTitle } from '../components/SecondaryTitle';
import CurrentOrderItem from '../components/CurrentOrderItem';
import theme from '../utils/theme';
import styled from 'styled-components';
import OldOrderItem from '../components/OldOrderItem';
import { ProductGrid } from '../components/ProductGrid';

const StyledSection = styled.section`
    width: 50%;
    margin: 1em auto;
    padding: 1em 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: ${props => props.theme.colors.mudgreen};
    border-radius: 10px;
`;


function ProfilePage() {

    const { currentUser } = useAuth();
    const ordersInProcess = firebaseInstance.firestore().collection('orders_in_process');
    const ordersFinished = firebaseInstance.firestore().collection('orders_finished');
    const [currentOrder, setCurrentOrder] = useState(null);
    const [oldOrders, setOldOrders] = useState(null);

    useEffect(() => {
        ordersInProcess.get()
        .then(query => {
           query.forEach(doc => {
               if(doc.data().customer === currentUser.uid) {
                   setCurrentOrder(doc.data())
               }
           })
        })
    }, [])

    useEffect(() => {
        let order = [];
        ordersFinished.get()
        .then(query => {
           query.forEach(doc => {
               if(doc.data().customer === currentUser.uid) {
                   order.push(doc.data())
               }
           })
        })
        .then(() => setOldOrders(order))
    }, [])

    return(
        <main>
            {
                currentOrder && 
                    <>
                    <SecondaryTitle style={{textAlign: 'center'}}>Your current order</SecondaryTitle>
                    <StyledSection>
                        {
                            currentOrder.order.map(item => {
                                return(
                                    <CurrentOrderItem 
                                        item={item}
                                    />
                                )
                            })
                        }
                        <p>Status: 
                            {
                                currentOrder.finished === false ? ' in process' : ' ready for pick up'
                            }
                        </p>
                    </StyledSection>
                    </>
            }
            {
                currentOrder && 
                    <>
                    <SecondaryTitle style={{textAlign: 'center'}}>Previous orders</SecondaryTitle>
                    <ProductGrid>
                        <OldOrderItem item={currentOrder.order} /> 
                    </ProductGrid>
                    </>
            }
        </main>
    )
};

export default ProfilePage;
