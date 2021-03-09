import React from 'react';
import { useRouter } from '../../contexts/BasketContext';
import Link from 'next/link';
import MenuItemCard from '../MenuItemCard';
import { useBasket } from '../../contexts/BasketContext';
 

const ProductCard = ({ product }) => {

    const basket = useBasket();
    console.log(basket)

    const handleClick = (product) => {
        let tempCart = [...basket.products];
        let tempProduct = tempCart.find(el => el.id === product.id);
        if (!tempProduct) {
            basket.addProduct({
                title: product.title,
                price: product.price,
                id: product.id,
                count: 1,
                total: product.price
            });
            console.log(product);
        } else {
            let newItem = tempProduct;
            newItem.count += 1;
            newItem.total = newItem.count * newItem.price;
        };

        console.log('data', basket.products)
    };

    return(
        <section>
            <img />
            <div>
                <h3>{product.title}</h3>
                <div>
                    {
                        product.category === 'burger' ? 
                            <Link href={'/order/' + product.id}>
                                <a>Modify</a>
                            </Link> 
                            : ''
                    }
                    <button onClick={() => handleClick(product)}>Add</button>
                </div>
            </div>
        </section>
    )
}

export default ProductCard;