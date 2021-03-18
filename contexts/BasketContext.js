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
        // const handleCompare = (el) => {
        //     if(el.extras.length !== product.extras.length) {
        //         return false;
        //     } else {
        //         let result = false;
        //         for (let i = 0; i < product.extras.length; i++) {
        //             if(product.extras[i] != el.extras[i]) {
        //                 return false;
        //             } else {
        //                 result = true;
        //             }
                    
        //         }
        //         return result;
        //     }
        // };
        let tempCart = [...products];
        console.log(JSON.stringify(product.extras))
        let tempProduct = tempCart.find(el => el.id === product.id && el.patty === product.patty && JSON.stringify(el.extras) === JSON.stringify(product.extras));
        if (!tempProduct) {
            setProducts([...products, product])
        } else {
            let temp = JSON.stringify(tempProduct.extras);
            let prod = JSON.stringify(product.extras);
            console.log(temp, prod)
            
            if (temp === prod) {
                addToCount(product);
                console.log('added to count')
            } else {
                setProducts([...products, product])
                console.log('added new prod')
            }
        };
    };

    const addToCount = (product) => {
        let tempCart = [...products];
        let updatedProduct = tempCart.find(el => el.id === product.id);
        let totalPrice = updatedProduct.total / updatedProduct.count;

        let index = tempCart.indexOf(updatedProduct);
        tempCart.splice(index, 1);
        updatedProduct.count += 1;
        updatedProduct.total = updatedProduct.total + totalPrice;
        tempCart.push(updatedProduct);
        setProducts(tempCart);
    };

    const subCount = (product) => {
        let tempCart = [...products];
        let updatedProduct = tempCart.find(el => el.id === product.id);
        let totalPrice = updatedProduct.total / updatedProduct.count;

        if(updatedProduct.count > 1) {
            let index = tempCart.indexOf(updatedProduct);
            tempCart.splice(index, 1);
            updatedProduct.count -= 1;
            updatedProduct.total = updatedProduct.total - totalPrice;
            tempCart.push(updatedProduct);
            setProducts(tempCart);
        } else {
            deleteProduct(product);
        }
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

    const deleteBasket = () => {
        setProducts([]);
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
        <BasketContext.Provider value={{products, addProduct, total, addToCount, deleteProduct, deleteBasket, subCount}}>
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