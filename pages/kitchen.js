import React, { useEffect, useState } from 'react';
import firebaseInstance from '../config/firebase';
import styled from 'styled-components';
import theme from '../utils/theme';

import { StyledBtn } from '../components/Buttons/StyledBtn';
import KitchenNav from '../components/KitchenNav';
import CartProduct from '../components/CartProduct';
import { readCollection } from '../database/firebaseHelpers';
import { readDocument } from '../database/firebaseHelpers';

const StyledMain = styled.main`
    width: 100vw;
    min-height: 100vh;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: ${props => props.theme.space[5]};
    padding:${props => props.theme.space[5]};
`;

const StyledSection = styled.section`
    width: 100%;
    padding: ${props => props.theme.space[3]};
    background-color: white;
    border-radius: 10px;
    display: flex;
    margin-bottom: ${props => props.theme.space[3]};
    justify-content: space-between;
`;

const StyledBackground = styled.section`
    background-color: green;
    border-radius: 10px;
    padding: ${props => props.theme.space[3]};
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
const Icon = styled.img`
    margin-right: ${props => props.theme.space[1]};
    width: 20px;
    position: relative;
    bottom: -6px;
`;

const KitchenPage = () => {

    const [currentOrders, setCurrentOrders] = useState(null);
    const ordersFinished = firebaseInstance.firestore().collection('orders_finished');

    useEffect(async () => {
        let coll = await readCollection('orders_in_process')
        coll.onSnapshot(snapshot => {
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

        let document = await readDocument('orders_in_process', item.id)

        document.update({
            accepted: !item.accepted
        })
        .then(() => {
            console.log('successful update!')
        })
        
    };

    const handleMark = async (item) => {

        let document = await readDocument('orders_in_process', item.id)

        document.update({
            finished: !item.finished
        })
        .then(() => {
            console.log('successful update!')
        })
        
    };

    const handleFinalized = async (item) => {

        let document = await readDocument('orders_in_process', item.id)

        document.update({
            pickedUp: true
        })
        .then(async () => {
            document.delete()
            ordersFinished.doc(item.id).set({
                ...item,
                pickedUp: true
            })
            
        })
    };
    

    return(
        <>
        <KitchenNav />
        <StyledMain>
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
                                        <p><Icon src='/comment.png'/> "{item.comment}"</p>
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
                                        {
                                            item.comment &&
                                            <p><Icon src='/comment.png'/> "{item.comment}"</p>
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