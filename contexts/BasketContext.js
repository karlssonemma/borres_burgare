import React, { useState, useEffect, createContext, useContext } from 'react';

const BasketContext = createContext({
    products: [],
    addProduct: () => {},
    total: 0
});

export const Basket = ({ children }) => {

    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);

    const addProduct = (product) => {
        let tempCart = [...products];
        let tempProduct = tempCart.find(el => el.id === product.id && el.extras === product.extras && el.patty === product.patty);
        if (!tempProduct) {
            setProducts([...products, product]);
        } else {
            addToCount(product);
        };
    };

    const addToCount = (product) => {
        let tempCart = [...products];
        let updatedProduct = tempCart.find(el => el.id === product.id);
        let index = tempCart.indexOf(updatedProduct);
        tempCart.splice(index, 1);
        updatedProduct.count += 1;
        updatedProduct.total = updatedProduct.count * updatedProduct.price;
        tempCart.push(updatedProduct);
        setProducts(tempCart);
    };

    const deleteProduct = (product) => {
        let tempCart = [...products];
        let tempItem = tempCart.find(item => item.id === product.id);
        if(tempItem) {
            let index = tempCart.indexOf(tempItem);
            tempCart.splice(index, 1)
        };
        setProducts([...tempCart]);
    };

    useEffect(() => {
        let data = localStorage.getItem('cart');
        let returned = JSON.parse(data);
        if (data) {
            setProducts(returned);
        };    
    }, [])

    useEffect(() => {
        let cartString = JSON.stringify(products);
        localStorage.setItem('cart', cartString);
    }, [products])

    useEffect(() => {
        let price = products.reduce((prev, cur) => {
            return prev + cur.total;
        }, 0)
        setTotal(price);
    }, [products])

    return(
        <BasketContext.Provider value={{products, addProduct, total, addToCount, deleteProduct}}>
            {children}
        </BasketContext.Provider>
    )
}

export const BasketConsumer = BasketContext.Consumer;

export const useBasket = () => {
    return(
        useContext(BasketContext)
    );
};