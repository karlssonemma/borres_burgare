import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import firebaseInstance from '../config/firebase';
import theme from '../utils/theme';
import styled from 'styled-components';
import { readCollection } from '../database/firebaseHelpers';

import { SecondaryTitle } from '../components/Text/SecondaryTitle';
import PreviousOrderItem from '../components/PreviousOrderItem';
import Nav from '../components/Nav';
import CartProduct from '../components/CartProduct';

const StyledMain = styled.main`
    width: 100%;
    min-height: 100vh;
    padding: ${props => props.theme.space[5]};
`;

const StyledSection = styled.section`
    max-width: 500px;
    width: 100%;
    margin: 0 auto;

    background-color: ${props => props.theme.colors.gray};
    border-radius: 10px;

    overflow: hidden;
`;

const FlexDiv = styled.div`
    padding: ${props => props.theme.space[3]};

    display: grid;
    grid-template-columns: auto max-content;
`;

const Title = styled(SecondaryTitle)`
    margin: ${props => props.theme.space[3]};
`;

const Status = styled.p`
    padding: ${props => props.theme.space[3]};

    background-color: darkgray;

    position: relative;
    text-align: center; 
`;

const GreenStatus = styled(Status)`
    background-color: ${props => props.theme.colors.green};
`;

const Icon = styled.img`
    width: 20px;
    margin-right: ${props => props.theme.space[1]};

    position: relative;
    bottom: -6px;
`;

const StyledGrid = styled.ul`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 20px;

    @media screen and (min-width: ${props => props.theme.breakpoints[2]}) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

const Text = styled.p`
    padding-top: ${props => props.theme.space[3]};
    
    font-size: ${props => props.theme.fontSizes.m};
    text-align: center;
`;


function ProfilePage() {

    const { currentUser } = useAuth();
    const [currentOrder, setCurrentOrder] = useState(null);
    const [previousOrders, setPreviousOrders] = useState(null);
    const [status, setStatus] = useState('');

    
    //get data current order
    useEffect(async () => {
        let coll = await readCollection('orders_in_process')
        coll.onSnapshot(snapshot => {
            snapshot.forEach(doc => {
                if (doc.data().customer === currentUser.uid) {
                    setCurrentOrder(doc.data())
                }
            })
        })
    }, [])

    //get data old orders
    useEffect(async () => {
        let order = [];
        let coll = await readCollection('orders_finished')
        coll.get()
        .then(query => {
           query.forEach(doc => {
               if(doc.data().customer === currentUser.uid) {
                   order.push(doc.data())
               }
           })
        })
        .then(() => {
            if (order.length) setPreviousOrders(order)
        })
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
        <StyledMain>
                {
                    currentOrder && 
                    <div>
                        <Title style={{textAlign: 'center'}}>Current order</Title>
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
                        </div>
                }
           
                {
                    previousOrders !== null &&
                    <div>
                    <Title style={{textAlign: 'center'}}>Previous orders</Title>
                        <StyledGrid>
                            {
                                previousOrders.map(item => {
                                    return(
                                        <PreviousOrderItem item={item} key={item.id} disabled={currentOrder !== null} />
                                    )
                                })
                            } 
                        </StyledGrid>
                    </div>
                }
                {
                    (currentOrder == null && previousOrders == null) &&
                    <Text>You have no current nor past orders!</Text>
                }
        </StyledMain>
        </>
    )
};

export default ProfilePage;
