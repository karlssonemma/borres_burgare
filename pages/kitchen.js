import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '../utils/theme';
import { ProductGrid } from '../components/ProductGrid';
import { StyledBtn } from '../components/StyledBtn';
import firebaseInstance from '../config/firebase';
import { Basket } from '../contexts/BasketContext';

const StyledMain = styled.main`
    width: 100vw;
    min-height: 100vh;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`;

const StyledSection = styled.section`
    width: 100%;
    margin-top: 1em;
    padding: 1em;
    background-color: ${props => props.theme.colors.gray};
    border-radius: 10px;
`;

const KitchenPage = () => {

    const [currentOrders, setCurrentOrders] = useState(null);
    const ordersInProcess = firebaseInstance.firestore().collection('orders_in_process');
    const ordersFinished = firebaseInstance.firestore().collection('orders_finished');

    useEffect(() => {
        const unsubscribe = ordersInProcess.onSnapshot(snapshot => {
            let orders = [];
            snapshot.forEach(doc => {
                orders.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setCurrentOrders(orders);
        })
        return unsubscribe
    }, [])

    const handleAccept = async (item) => {
        console.log(item)
        let document = await ordersInProcess.doc(item.id);

        document.update({
            accepted: !item.accepted
        })
        .then(() => {
            console.log('successful update!')
        })
        
    };

    const handleMark = async (item) => {
        console.log(item)
        let document = await ordersInProcess.doc(item.id);

        document.update({
            finished: !item.finished
        })
        .then(() => {
            console.log('successful update!')
        })
        
    };

    const handleFinalized = async (item) => {
        console.log(item)
        let document = await ordersInProcess.doc(item.id);

        document.update({
            pickedUp: true
        })
        .then( async () => {
            ordersInProcess.doc(item.id).delete()
            ordersFinished.doc(item.id).set({
                ...item
            })
            
        })
    };
    

    return(
        <StyledMain>
            {/* <h1>Orders</h1> */}
                <section style={{borderRight: '1px solid black', padding: '0 1em'}}>
                {
                    currentOrders && currentOrders.map(item => {
                        if (item.accepted === false) {
                            return(
                                <StyledSection key={item.id}>
                                    <p>{item.customer}</p>
                                    {
                                        item.order.map(item => {
                                            return(
                                                <p>{item.count} x {item.title}
                                                {
                                                    item.extras && item.extras.map(item => 
                                                        <span style={{display: 'block', marginLeft: '1.5em'}}>+ {item}</span>
                                                    )
                                                }
                                                </p>
                                            )
                                        })
                                    }
                                    {
                                        item.comment !== null &&
                                        <p>Comment: "{item.comment}"</p>
                                    }
                                    <StyledBtn onClick={() => handleAccept(item)}>Accept</StyledBtn>
                                </StyledSection>
                            )
                        }
                    })
                }
                </section>
                <section style={{padding: '0 1em'}}>
                    {
                        currentOrders && currentOrders.map(item => {
                            if (item.accepted === true) {
                                return(
                                    <StyledSection key={item.id}>
                                         <p>{item.customer}</p>
                                            {
                                                item.order.map(item => {
                                                    return(
                                                        <p>{item.count} x {item.title}
                                                        {
                                                            item.extras && item.extras.map(item => 
                                                                <span style={{display: 'block'}}>+ {item}</span>
                                                            )
                                                        }
                                                        </p>
                                                    )
                                                })
                                            }
                                            {
                                                item.finished === false 
                                                ? <StyledBtn onClick={() => handleMark(item)}>Mark as ready</StyledBtn>
                                                : <StyledBtn onClick={() => handleFinalized(item)}>Picked up</StyledBtn>
                                            }
                                    </StyledSection>
                                )
                            }
                        })
                    }
                </section>
        </StyledMain>
    )
};

export default KitchenPage;