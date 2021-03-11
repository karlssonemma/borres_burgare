import React from 'react';
import { useRouter } from '../../contexts/BasketContext';
import styled from 'styled-components';
import Link from 'next/link';
import MenuItemCard from '../MenuItemCard';
import { useBasket } from '../../contexts/BasketContext';
import { StyledBtn } from '../../components/StyledBtn';
import { SecondaryTitle } from '../SecondaryTitle';
 
const StyledSection = styled.section`
    background: url('https://res.cloudinary.com/norgesgruppen/images/c_scale,dpr_auto,f_auto,q_auto:eco,w_1600/ikfq076wqj996ei0rv3f/hjemmelaget-burger-med-bacon-cheddarost-og-rodlok');
    background-size: cover;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 100%;
    border-radius: 10px;
`;

const ButtonField = styled.section`
    background-color: rgba(255, 255, 255, 0.6);
    padding: 1em;
`;


const ProductCard = ({ product, onBtnClick }) => {

    const basket = useBasket();
    console.log(basket)

    const handleClick = (product) => {
            basket.addProduct({
                title: product.title,
                price: product.price,
                id: product.id,
                count: 1,
                total: product.price,
                patty: 'Beef'
            });
        console.log('data', basket.products)
    };


    return(
        <StyledSection>
            <img />
            
                <SecondaryTitle>
                    <span className='product-title'>{product.title}</span>
                    <span className='product-price'>{product.price}</span>
                </SecondaryTitle>
                <ButtonField>
                    {/* {
                        product.category === 'burger' ? 
                            <Link href={'/order/' + product.id}>
                                <a>Modify</a>
                            </Link> 
                            : ''
                    } */}
                    {
                        product.category === 'burger' && <StyledBtn onClick={() => onBtnClick()}>Modify</StyledBtn>
                    }
                    <StyledBtn onClick={() => handleClick(product)}>Add</StyledBtn>
                </ButtonField>
            
        </StyledSection>
    )
}

export default ProductCard;