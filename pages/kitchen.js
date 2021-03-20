import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '../utils/theme';
import { ProductGrid } from '../components/ProductGrid';
import { StyledBtn } from '../components/Buttons/StyledBtn';
import firebaseInstance from '../config/firebase';
import { Basket } from '../contexts/BasketContext';
import KitchenNav from '../components/KitchenNav';
import { ExtraSpan } from '../components/Text/ExtraSpan';
import CartProduct from '../components/CartProduct';

const StyledMain = styled.main`
    width: 100vw;
    min-height: 100vh;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2em;
    padding: 2em;
`;

const StyledSection = styled.section`
    width: 100%;
    padding: 1em;
    background-color: white;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
`;

const StyledBackground = styled.section`
    background-color: green;
    border-radius: 10px;
    padding: 1em;
    background-color: ${props => props.theme.colors.gray};
`;

const GreenBtn = styled(StyledBtn)`
    background-color: ${props => props.theme.colors.buttons.green.background};
    &:hover {
        background-color: ${props => props.theme.colors.buttons.green.hover.background};
    }
`;

const FlexDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content:space-between;
    align-items: flex-end;
`;

const KitchenPage = () => {

    const [currentOrders, setCurrentOrders] = useState(null);
    const ordersInProcess = firebaseInstance.firestore().collection('orders_in_process');
    const ordersFinished = firebaseInstance.firestore().collection('orders_finished');

    useEffect(async () => {
        await ordersInProcess.onSnapshot(snapshot => {
            let orders = [];
            snapshot.forEach(doc => {
                orders.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setCurrentOrders(orders);
        })
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
        <>
        <KitchenNav />
        <StyledMain>
            {/* <h1>Orders</h1> */}
                <StyledBackground>
                {
                    currentOrders && currentOrders.map(item => {
                        if (item.accepted === false) {
                            return(
                                <StyledSection key={item.id}>
                                    <div>
                                    {
                                        item.order.map(item => {
                                            return(
                                                
                                                <CartProduct item={item} />
                                                
                                            )
                                        })
                                    }
                                    {
                                        item.comment &&
                                        <p>Comment: "{item.comment}"</p>
                                    }
                                    </div>
                                    <FlexDiv>
                                        <p>#{item.orderNr}</p>
                                        <StyledBtn onClick={() => handleAccept(item)}>Accept</StyledBtn>
                                    </FlexDiv>     
                                </StyledSection>
                            )
                        }
                    })
                }
                </StyledBackground>
                <StyledBackground>
                    {
                        currentOrders && currentOrders.map(item => {
                            if (item.accepted === true) {
                                return(
                                    <StyledSection key={item.id}>
                                        <div>
                                        {
                                            item.order.map(item => {
                                                return(
                                                    <CartProduct item={item} />
                                                )
                                            })
                                        }
                                        </div>
                                        <FlexDiv>
                                            <p>#{item.orderNr}</p>
                                            {
                                                item.finished === false 
                                                ? <StyledBtn onClick={() => handleMark(item)}>Mark as ready</StyledBtn>
                                                : <GreenBtn onClick={() => handleFinalized(item)}>Picked up</GreenBtn>
                                            }
                                        </FlexDiv>
                                    </StyledSection>
                                )
                            }
                        })
                    }
                </StyledBackground>
        </StyledMain>
        </>
    )
};

export default KitchenPage;