import React, { useState, useEffect, createContext, useContext } from 'react';

const BasketContext = createContext({
    products: [],
    addProduct: () => {},
    total: 0
});

export const Basket = ({ children }) => {

    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        products.sort((a, b) => {
            if (a.title > b.title) {
                return 1;
            } else {
                return -1;
            }
        })
    }, [products])

    const addProduct = (product) => {
        if (product.category === 'burger') {
        
            let newProd;
            let hasSameProduct = false
            const hasProductWithSameTitle = products.filter((item) => {
            return product.title === item.title && item.patty === product.patty;
            });
            if (hasProductWithSameTitle.length) {
                hasSameProduct = hasProductWithSameTitle.some(basketItem => {
                    if(product.extras && product.extras.length === basketItem.extras.length) {
                        const sameExtras = product.extras.every(extra => {
                            return basketItem.extras.includes(extra)
                        })
                        if(sameExtras) {
                            newProd = basketItem;
                            return true
                        } else {
                            return false
                        }
                    }
                })
            }

            if (hasSameProduct) {
                // Add to the number of products
                console.log('do something');
                let newArr = [...products];
                let index = products.indexOf(newProd);
                let totalPrice = newArr[index].total / newArr[index].count;
                newArr[index] = {
                    ...newArr[index], 
                    count: newArr[index].count + 1,
                    total: newArr[index].total + totalPrice
                    }
                setProducts(newArr);   
            } else {
                // add new product
                console.log('added NEW')
                setProducts([...products, product])
            }
        } else {
            let tempCart = [...products];
            let tempProd = tempCart.find(el => el.title === product.title);
            if(!tempProd) {
                setProducts([...products, product]);
            } else {
                let index = products.indexOf(tempProd);
                tempCart[index] = {
                    ...tempCart[index],
                    count: tempCart[index].count + 1,
                    total: tempCart[index].count * tempCart[index].price
                }
                setProducts(tempCart);
            }
        }
    };

    const addToCount = (product) => {
        let tempCart = [...products];
        let updatedProduct = tempCart.find(el => el.id === product.id && el.patty === product.patty && JSON.stringify(el.extras) === JSON.stringify(product.extras));

        
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
        let updatedProduct = tempCart.find(el => el.id === product.id && el.patty === product.patty && JSON.stringify(el.extras) === JSON.stringify(product.extras));

        if(updatedProduct.count > 1) {
            let totalPrice = updatedProduct.total / updatedProduct.count;
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
        <BasketContext.Provider value={{products, setProducts, addProduct, total, addToCount, deleteProduct, deleteBasket, subCount}}>
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