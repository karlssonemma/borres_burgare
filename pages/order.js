import React, { useEffect } from 'react';
import firebaseInstance from '../config/firebase';
import { OrderContainer } from '../components/OrderContainer';
import readCollection from '../database/readCollection';
import MenuItemCard from '../components/MenuItemCard';

function OrderPage({ burgers }) {


    return(
        <main>
            <OrderContainer>
                {
                    burgers.map(item => {
                        return(
                            <MenuItemCard 
                                key={item.id}
                                itemTitle={item.title}
                                price={item.price}
                                description={item.description}
                                allergens={item.allergens}
                            />
                        )
                    })
                }
            </OrderContainer>
        </main>
    )
}

OrderPage.getInitialProps = async () => {
    try {
        const collection = await firebaseInstance.firestore().collection('burgers');
        const dataCollection = await collection.get();

        let burgers = [];

        dataCollection.forEach(burg => {
            burgers.push({
                id: burg.id,
                ...burg.data()
            });
        });
        
        return { burgers }

    } catch (error) {
        return {
            error: error.message
        };
    };
};


export default OrderPage;