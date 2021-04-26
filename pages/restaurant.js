import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import firebaseInstance from '../config/firebase';
import theme from '../utils/theme';

import { SecondaryTitle } from '../components/Text/SecondaryTitle';

const StyledMain = styled.main`
    width: 100vw;
    height: 100vh;
    padding: ${props => props.theme.space[5]};

    display: grid;
    grid-gap: ${props => props.theme.space[5]};
    grid-template-columns: repeat(2, 1fr);
`;

const StyledSection = styled.section`
    padding: ${props => props.theme.space[5]};

    background-color: ${props => props.theme.colors.gray};
    border-radius: 20px;
`;

const StyledNumber = styled.h2`
    width: max-content;
    height: max-content;
    padding: ${props => props.theme.space[3]};
    margin: 0 ${props => props.theme.space[3]} ${props => props.theme.space[3]} 0;

    font-size: ${props => props.theme.space[5]};
    border-radius: 10px;
    display: inline-block;
    background-color: ${props => props.theme.colors.buttons.orange.background};
`;

const GreenNumber = styled(StyledNumber)`
    background-color: ${props => props.theme.colors.buttons.green.background};
`;

const CenteredTitle = styled(SecondaryTitle)`
    margin-bottom: ${props => props.theme.space[3]};
    
    text-align: center;
    font-size: ${props => props.theme.fontSizes.xl};

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