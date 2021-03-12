import React from 'react';
import { useRouter } from '../../contexts/BasketContext';
import styled from 'styled-components';
import Link from 'next/link';
import MenuItemCard from '../MenuItemCard';
import { useBasket } from '../../contexts/BasketContext';
import { StyledBtn } from '../../components/StyledBtn';
import { SecondaryTitle } from '../SecondaryTitle';
import Overlay from '../../components/Overlay';
 
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
    display: flex;
    justify-content: space-between;
`;


const ProductCard = ({ product, onBtnClick, onInfoBtnClick }) => {

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

    const showInfo = (e) => {
        console.log(e.target)
    };

    return(
        <StyledSection onClick={e => showInfo(e)}>
            <SecondaryTitle className='product-card-title' style={{padding: '0 0.5em'}}>
                <span className='product-title'>{product.title}</span>
                <span className='product-price'>{product.price + ' NOK'}</span>
            </SecondaryTitle>
            <ButtonField>
                {/* {
                    product.category === 'burger' ? 
                        <Link href={'/order/' + product.id}>
                            <a>Modify</a>
                        </Link> 
                        : ''
                } */}
                <StyledBtn onClick={() => handleClick(product)}>Add</StyledBtn>
                {
                    product.category === 'burger' && <StyledBtn onClick={() => onBtnClick()}>Modify</StyledBtn>
                }
            </ButtonField>
        </StyledSection>
    )
}

export default ProductCard;