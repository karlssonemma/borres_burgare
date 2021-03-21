import React from 'react';
import styled from 'styled-components';
import { useBasket } from '../../contexts/BasketContext';
import { StyledBtn } from '../Buttons/StyledBtn';
import { SecondaryTitle } from '../Text/SecondaryTitle';
 
const StyledSection = styled.li`
    background: url('https://static.feber.se/article_images/48/28/13/482813_1920.jpg');
    background-size: cover;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
`;

const ButtonField = styled.section`
    background-color: rgba(255, 255, 255, 0.6);
    padding: 1em;
    display: flex;
    justify-content: space-between;
`;


const ProductCard = ({ product, onBtnClick, onInfoBtnClick }) => {

    const basket = useBasket();

    const handleClick = (product) => {
        if(product.category === 'burger') {
            basket.addProduct({
                title: product.title,
                price: product.price,
                id: product.id,
                count: 1,
                total: product.price,
                patty: 'Beef',
                extras: [],
                category: product.category
            });
        } else {
            basket.addProduct({
                title: product.title,
                price: product.price,
                id: product.id,
                count: 1,
                total: product.price,
                category: product.category
            });
        }
    };


    return(
        <StyledSection>
            <SecondaryTitle className='product-card-title' style={{padding: '1em .8em'}}>
                <span className='product-title'>{product.title}</span>
                <span className='product-price'>{product.price + ' NOK'}</span>
            </SecondaryTitle>
            <ButtonField>
                <StyledBtn onClick={() => handleClick(product)}>Add</StyledBtn>
                {
                    product.category === 'burger' && <StyledBtn onClick={() => onBtnClick()}>Modify</StyledBtn>
                }
            </ButtonField>
        </StyledSection>
    )
}

export default ProductCard;