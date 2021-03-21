import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import firebaseInstance from '../config/firebase';
import { SecondaryTitle } from '../components/Text/SecondaryTitle';
import theme from '../utils/theme';
import styled from 'styled-components';
import OldOrderItem from '../components/OldOrderItem';
import { ProductGrid } from '../components/ProductGrid';
import Nav from '../components/Nav';
import CartProduct from '../components/CartProduct';

const StyledSection = styled.section`
    max-width: 500px;
    width: 60%;
    margin: 1em auto;
    background-color: ${props => props.theme.colors.gray};
    border-radius: 10px;
    overflow: hidden;
`;

const FlexDiv = styled.div`
    display: grid;
    grid-template-columns: auto max-content;
    padding: 1em;
`;

const Title = styled(SecondaryTitle)`
    margin-top: 1em;
`;

const Status = styled.p`
    background-color: darkgray;
    position: relative;
    padding: 1em;
    text-align: center; 
`;

const GreenStatus = styled(Status)`
    background-color: ${props => props.theme.colors.green};
`;

const Icon = styled.img`
    margin-right: .4em;
    width: 20px;
    position: relative;
    bottom: -6px;
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
                }
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
                setStatus(' Waiting for the restaurant to accept your order');
            } else if (currentOrder.accepted === true && currentOrder.finished === true) {
                setStatus(' Ready for pick up');
            } else if (currentOrder.accepted === true) {
                setStatus(' Your order is being prepared');
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
                    <Title style={{textAlign: 'center'}}>Your current order</Title>
                    <StyledSection>
                        <FlexDiv>
                            <div>
                            {
                                currentOrder.order.map(item => {
                                    return(
                                        <CartProduct 
                                            item={item}
                                        />
                                    )
                                })
                            }
                            {
                                currentOrder.comment && <p><Icon src='/comment.png'/> "{currentOrder.comment}"</p>
                            }
                            </div>
                            <p>#{currentOrder.orderNr}</p>
                        </FlexDiv>
                        {
                            status === ' Ready for pick up' 
                                ? <GreenStatus>{status}</GreenStatus>
                                : <Status>{status}</Status>
                        }
                    </StyledSection>
                    </>
            }
            {
                oldOrders && 
                    <>
                    <Title style={{textAlign: 'center'}}>Previous orders</Title>
                    <ProductGrid>
                        {
                            oldOrders.map(item => {
                                return(
                                    <OldOrderItem item={item} key={item.id} />
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
