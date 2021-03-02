import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import InputField from '../InputField';
import RadioInput from '../RadioInput';
import Btn from '../Btn';

const StyledSection = styled.section`
    width: 100%;
    height: 250px;
    margin: 1em;

    display: flex;
    border-radius: 10px;
    /* box-shadow: 0px 0px 10px 2px #888888; */
    border: 1px solid #a3a3a3;
    cursor: pointer;
    overflow: hidden;
`;

const StyledTitle = styled.h3`
    padding: .5em 0;
`;

const StyledList = styled.ul`
    list-style: none;
`;

const StyledListItem = styled.li`
    display: inline-block;
`;

const StyledImg = styled.img`
    height: 100%;
    margin-right: 1em;
    object-fit: contain;
`;


function MenuItemCard({ 
    itemTitle, 
    price, 
    description, 
    allergens, 
    patty, 
    item,  
    onBtnClickHandler,
    handleChange,
    }) {

 

    return(
        <StyledSection>
                <StyledImg src={'https://res.cloudinary.com/norgesgruppen/images/c_scale,dpr_auto,f_auto,q_auto:eco,w_1600/ikfq076wqj996ei0rv3f/hjemmelaget-burger-med-bacon-cheddarost-og-rodlok'} />
                <div>
                    <StyledTitle>{itemTitle}</StyledTitle>
                    <p>{description}</p>
                    <form className='choosePatty' onChange={e => handleChange(e)}>
                        {
                            patty && patty.map(item => {
                                return(
                                    <RadioInput
                                        radioValue={item} 
                                        key={item} 
                                        radioName='Patty' 
                                    />
                                )
                            })
                        }
                    </form>
                    <div>
                        <h4>{price} NOK</h4>
                    </div>
                    <Btn 
                        onBtnClickHandler={() => onBtnClickHandler(item)} 
                        btnText='Add to cart' 
                    />
                    <StyledList>Allergens:
                        {
                            allergens && allergens.map(item => {
                                return(
                                    <StyledListItem key={item}>
                                        {item}
                                    </StyledListItem>
                                )
                            })
                        }
                    </StyledList>
                </div>

        </StyledSection>
    )
}

export default MenuItemCard;