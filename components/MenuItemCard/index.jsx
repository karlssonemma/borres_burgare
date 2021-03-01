import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import InputField from '../InputField';
import RadioInput from '../RadioInput';
import Btn from '../Btn';

const StyledSection = styled.section`
    width: 50%;
    height: max-content;
    margin: 1em 0;
    padding: 1em 1em;
    border-radius: 10px;
    /* box-shadow: 0px 0px 10px 2px #888888; */
    border: 3px solid black;
    background-color: #f1f1f1;
    cursor: pointer;
`;

const StyledTitle = styled.h3`
    padding-bottom: .5em;
`;

const StyledList = styled.ul`
    list-style: none;
`;

const StyledListItem = styled.li`
    display: inline-block;
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
                <StyledTitle>{itemTitle}</StyledTitle>
                <p>{description}</p>
                <StyledList>Allergens:
                    {
                        allergens.map(item => {
                            return(
                                <StyledListItem key={item}>
                                    {item}
                                </StyledListItem>
                            )
                        })
                    }
                </StyledList>
                <form className='choosePatty' onChange={e => handleChange(e)}>
                    {
                        patty.map(item => {
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
                    btnText='add to cart' 
                />

        </StyledSection>
    )
}

export default MenuItemCard;