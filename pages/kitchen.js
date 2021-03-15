import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '../utils/theme';
import { ProductGrid } from '../components/ProductGrid';
import { StyledBtn } from '../components/StyledBtn';
import firebaseInstance from '../config/firebase';

const StyledMain = styled.main`
    width: 100vw;
`;

const StyledSection = styled.section`
    width: 100%;
    margin-top: 1em;
    padding: 1em;
    background-color: ${props => props.theme.colors.mudgreen};
`;

const KitchenPage = () => {

    const [currentOrders, setCurrentOrders] = useState(null);
    const ordersInProcess = firebaseInstance.firestore().collection('orders_in_process');

    useEffect(async () => {
        let orders = [];
        await ordersInProcess.get()
        .then(query => {
            query.forEach(doc => {
                orders.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
        })
        setCurrentOrders(orders);
    }, [])

    const handleMark = async (item) => {
        console.log(item)
        let document = await ordersInProcess.doc(item.id);

        document.onSnapshot(doc => {
            console.log('current Data', doc.data())
        })
        document.update({
            finished: true
        })
        .then(() => {
            console.log('successful update!')
        })
        
    };

    return(
        <StyledMain>
            <h1>Orders</h1>
                {
                    currentOrders && currentOrders.map(item => {
                        console.log(item.id)
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
                                    <StyledBtn onClick={() => handleMark(item)}>Mark as ready</StyledBtn>
                            </StyledSection>
                        );
                    })
                }
        </StyledMain>
    )
};

export default KitchenPage;