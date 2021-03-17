import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import firebaseInstance from '../config/firebase';
import { SecondaryTitle } from '../components/SecondaryTitle';
import CurrentOrderItem from '../components/CurrentOrderItem';
import theme from '../utils/theme';
import styled from 'styled-components';
import OldOrderItem from '../components/OldOrderItem';
import { ProductGrid } from '../components/ProductGrid';
import Nav from '../components/Nav';
import CartProduct from '../components/CartProduct';

const StyledSection = styled.section`
    width: 50%;
    margin: 1em auto;
    padding: 1em 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: ${props => props.theme.colors.gray};
    border-radius: 10px;
`;


function ProfilePage() {

    const { currentUser } = useAuth();
    const ordersInProcess = firebaseInstance.firestore().collection('orders_in_process');
    const ordersFinished = firebaseInstance.firestore().collection('orders_finished');
    const [currentOrder, setCurrentOrder] = useState(null);
    const [oldOrders, setOldOrders] = useState(null);
    const [status, setStatus] = useState('');

    //get data current order
    useEffect(() => {
        ordersInProcess.onSnapshot(snapshot => {
            snapshot.forEach(doc => {
                if (doc.data().customer === currentUser.uid) {
                    setCurrentOrder(doc.data())
                };
            })
        })
    }, [])

    //get data old orders
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

    //set status for order
    useEffect(() => {
        if (currentOrder) {
            if (currentOrder.accepted === false) {
                setStatus(' waiting for the restaurant to accept your order');
            } else if (currentOrder.accepted === true && currentOrder.finished === true) {
                setStatus(' ready for pick up');
            } else if (currentOrder.accepted === true) {
                setStatus(' in process');
            }
        }
    }, [currentOrder])

    return(
        <>
        <Nav />
        <main>
            {
                currentOrder && 
                    <>
                    <SecondaryTitle style={{textAlign: 'center'}}>Your current order</SecondaryTitle>
                    <StyledSection>
                        <div style={{width: 'max-content'}}>
                        {
                            currentOrder.order.map(item => {
                                return(
                                    <CartProduct 
                                        item={item}
                                    />
                                )
                            })
                        }
                        </div>
                        {
                            currentOrder.comment && <p>{currentOrder.comment}</p>
                        }
                        <p>Status: {status}</p>
                    </StyledSection>
                    </>
            }
            {
                oldOrders && 
                    <>
                    <SecondaryTitle style={{textAlign: 'center'}}>Previous orders</SecondaryTitle>
                    <ProductGrid>
                        {
                            oldOrders.map(item => {
                                return(
                                    <OldOrderItem item={item} />
                                )
                            })
                        } 
                    </ProductGrid>
                    </>
            }
        </main>
        </>
    )
};

export default ProfilePage;
