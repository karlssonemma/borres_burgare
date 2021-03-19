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
    // Hvis prod navn eksisterer i listen sjekk om noen av de har samme addons
    let newProd;
    let hasSameProduct = false
    const hasProductWithSameTitle = products.filter((item) => {
      return product.title === item.title;
    });
    // If there is a product with the same title i nthe basket
    if (hasProductWithSameTitle.length) {
      // Check if one of the items have the same addons
      hasSameProduct = hasProductWithSameTitle.some(basketItem => {
        // By first checking if number of addons are equal
        if(product.extras && product.extras.length === basketItem.extras.length) {
          // Then check if all the addons in the new product exists in one of the products in the basket
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

    if(hasSameProduct){
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