import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import firebaseInstance from '../config/firebase';
import { SecondaryTitle } from '../components/Text/SecondaryTitle';
import { ThirdTitle } from '../components/Text/ThirdTitle';
import theme from '../utils/theme';

const StyledMain = styled.main`
    width: 100vw;
    height: 100vh;
    padding: 2em;
    display: grid;
    grid-gap: 2em;
    grid-template-columns: repeat(2, 1fr);
`;

const StyledSection = styled.section`
    padding: 2em;
    background-color: ${props => props.theme.colors.gray};
    border-radius: 20px;
`;

const StyledNumber = styled.h2`
    width: max-content;
    height: max-content;
    font-size: 2rem;
    padding: 1em;
    margin: 0 1em 1em 0;
    border-radius: 10px;
    display: inline-block;
    background-color: ${props => props.theme.colors.buttons.orange.background};
`;

const GreenNumber = styled(StyledNumber)`
    background-color: ${props => props.theme.colors.buttons.green.background};
`;

const CenteredTitle = styled(SecondaryTitle)`
    text-align: center;
    margin-bottom: 1em;
`;

function RestaurantPage() {

    const [orders, setOrders] = useState(null);
    const orderColl = firebaseInstance.firestore().collection('orders_in_process');

    useEffect(async () => {
        await orderColl.onSnapshot(snapshot => {
            let ordersArr = [];
            snapshot.forEach(doc => {
                ordersArr.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setOrders(ordersArr);
            console.log(orders)
        })
        
    }, [])

    return(
        <StyledMain>
            <StyledSection>
                <CenteredTitle>Being prepared</CenteredTitle>
                {
                    orders && orders.map(item => {
                        if (item.accepted === true && item.finished === false) {
                            return(
                                <StyledNumber>#{item.orderNr}</StyledNumber>
                            )
                        } else {
                            return null;
                        }
                    })
                }
            </StyledSection>
            <StyledSection>
                <CenteredTitle>Ready for pick up</CenteredTitle>
                {
                    orders && orders.map(item => {
                        if (item.accepted === true && item.finished === true && item.pickedUp === false) {
                            return(
                                <GreenNumber>#{item.orderNr}</GreenNumber>
                            )
                        } else {
                            return null;
                        }
                    })
                }
            </StyledSection>
        </StyledMain>
    )
};

export default RestaurantPage;