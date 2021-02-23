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

    const current_cart = firebaseInstance.firestore().collection('current_cart');
    

    // useEffect(() => {
    //     if (current_cart.get() === null) {
    //         current_cart.get()
    //         .then(query => {
    //             query.forEach(doc => {
    //                 console.log(doc.data())
    //             });
    //         });
    //     } else {
    //         console.log('empty')
    //     }
    // }, [])


    // useEffect(() => {
    //     if (cart !== null) {
    //         cart.forEach(item => {
    //             current_cart.doc(`${item.id}`).set(item)
    //         })
    //     } else {

    //     }
    // }, [cart])

    function addToCart(item) {
        console.log(item)

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
                let newArray2 = [];
                console.log(item)
                newArray2.push(...cart, item);
                setCart(newArray2);
            }
        } else {
            let newArray = [];
            newArray.push(item);
            setCart(newArray);
        }
    };

    // function pattyValue(e) {
    //     chosenPatty = e.value;
    // }

    function removeItem(cartItem) {
        let arr = cart;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === cartItem.id) {
                let index = arr.indexOf(arr[i]);
                arr.splice(index, 1);
            };   
        };
        setCart([...arr]);
    };

    return(
        <main>
            <Container>
                {
                    burgers.map(item => {
                        return(
                            <MenuItemCard
                                onBtnClickHandler={item => addToCart(item)}
                                // onClickHandler={item => setChosen(item)}
                                onChangeRadioHandler={e => pattyValue(e)}
                                item={item}
                                quantity={item.quantity}
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
                <Cart 
                    cart={cart}
                    onBtnClickHandler={cartItem => removeItem(cartItem)}
                />
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