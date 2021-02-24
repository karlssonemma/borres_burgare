import React, { useEffect, useState } from 'react';
import firebaseInstance from '../config/firebase';
import { Container } from '../components/Container';
import readCollection from '../database/readCollection';
import MenuItemCard from '../components/MenuItemCard';
import Cart from '../components/Cart';



function OrderPage({ arr }) {

    const [chosen, setChosen] = useState(null);
    const [cart, setCart] = useState([]);
    const burgers = [...arr];

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
                console.log(found)
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
                setCart([...newArray2]);
            }
        } else {
            let newArray = [];
            newArray.push(item);
            setCart(newArray);
        }
    };

    function addItem(id) {
        let tempCart = [...cart];
        let tempProducts = [...burgers];
        let tempItem = tempCart.find(item => item.id === id);
        if (!tempItem) {
            tempItem = tempProducts.find(item => item.id === id);
            let newItem = {
                            ...tempItem, 
                            count: 1, 
                            total: tempItem.price
                          }
            tempCart.push(newItem);
            setCart(tempCart);
        } else {
            let index = tempCart.indexOf(tempItem);
            tempCart.splice(index, 1);
            let newCount = tempItem.count += 1;
            let newItem = {
                            ...tempItem, 
                            count: newCount,
                            total: tempItem.price * newCount
                          }
            tempCart.push(newItem);
            setCart(tempCart);
        }
    };

    // function pattyValue(e) {
    //     chosenPatty = e.value;
    // }

    function removeItem(id) {
        let tempCart = [...cart];
        let tempItem = tempCart.find(item => item.id === id);
        if(tempItem) {
            let index = tempCart.indexOf(tempItem);
            tempCart.splice(index, 1)
        };
        setCart([...tempCart]);
    };

    return(
        <main>
            <Container>
                {
                    burgers && burgers.map(item => {
                        return(
                            <MenuItemCard
                                handleChange={e => console.log(e.target.value)}
                                onBtnClickHandler={() => addItem(item.id)}
                                onClickHandler={item => setChosen(item)}
                                onChangeRadioHandler={e => pattyValue(e)}
                                // item={item}
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

                {/* {
                    burgers && burgers.map(item => {
                        return(
                            <section key={Math.floor(Math.random() * 100)}>
                                <p>{item.title}</p>
                                <button onClick={() => addItem(item.id)}>Add</button>
                            </section>
                            )
                    })
                } */}
            </Container>
            <Container>
                <Cart 
                    cart={cart}
                    onBtnClickHandler={item => removeItem(item.id)}
                />
            </Container>
        </main>
    )
}

OrderPage.getInitialProps = async () => {
    try {
        const collection = await firebaseInstance.firestore().collection('burgers');
        const dataCollection = await collection.get();

        const arr = [];

        dataCollection.forEach(burg => {
            arr.push({
                id: burg.id,
                ...burg.data()
            });
        });
        
        return { arr }

    } catch (error) {
        return {
            error: error.message
        };
    };
};


export default OrderPage;