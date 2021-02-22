import React, { useEffect, useState } from 'react';
import firebaseInstance from '../config/firebase';
import { Container } from '../components/Container';
import readCollection from '../database/readCollection';
import MenuItemCard from '../components/MenuItemCard';
import Cart from '../components/Cart';



function OrderPage({ burgers }) {

    const [chosen, setChosen] = useState(null);
    const [cart, setCart] = useState(null);
    let chosenPatty;

    function addToCart(item) {

        if (cart !== null) {

            const found = cart.find(el => el.id === item.id);

            if (found) {
                let newArray = [];

                for (let i = 0; i < cart.length; i++) {
                    if (cart[i].id === item.id) {
                        let newObj = cart[i];
                        newObj.quantity += 1;
                        newArray.push(newObj);
                    } else {
                        newArray.push(cart[i])
                    };
                };
                setCart(newArray);
            } else {
                let newArray = [];
                newArray.push(...cart, item);
                setCart(newArray);
            }
        } else {
            let newArray = [];
            newArray.push(item);
            setCart(newArray);
        }
    };

    function pattyValue(e) {
        chosenPatty = e.value;
    }

    return(
        <main>
            <Container>
                {
                    burgers.map(item => {
                        return(
                            <MenuItemCard
                                onBtnClickHandler={item => addToCart(item)}
                                onClickHandler={item => setChosen(item)}
                                onChangeRadioHandler={e => pattyValue(e)}
                                item={item}
                                key={item.id}
                                itemTitle={item.title}
                                price={item.price}
                                description={item.description}
                                allergens={item.allergens}
                                patty={item.patty}
                            />
                        )
                    })
                }
            </Container>
            <Container>
                <Cart cart={cart} />
            </Container>

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