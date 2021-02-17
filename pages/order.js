import React, { useEffect } from 'react';
import firebaseInstance from '../config/firebase';
import { OrderContainer } from '../components/OrderContainer';
import readCollection from '../database/readCollection';

function OrderPage() {


    return(
        <main>
            <OrderContainer>
                <code></code>
            </OrderContainer>
        </main>
    )
}


export default OrderPage;