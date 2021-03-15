import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import firebaseInstance from '../config/firebase';
import { SecondaryTitle } from '../components/SecondaryTitle';
import CurrentOrderItem from '../components/CurrentOrderItem';
import theme from '../utils/theme';
import styled from 'styled-components';

const StyledSection = styled.section`
    width: 100%;
    background-color: ${props => props.theme.colors.mudgreen};
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
                   setCurrentOrder(doc.data().order)
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
                currentOrder 
                    ? <SecondaryTitle>Your current order</SecondaryTitle>
                    : <SecondaryTitle>You have no current order</SecondaryTitle>
            }

            {
                currentOrder && 
                <StyledSection>
                    {
                        currentOrder.map(item => {
                            return(
                                <CurrentOrderItem 
                                    item={item}
                                />
                            )
                        })
                    }
                </StyledSection>
            }
            
        </main>
    )
};

export default ProfilePage;
