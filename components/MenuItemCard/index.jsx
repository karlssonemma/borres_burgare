import React, { useState } from 'react';
import styled from 'styled-components';
import InputField from '../InputField';
import RadioInput from '../RadioInput';
import Btn from '../Btn';

const StyledSection = styled.section`
    width: 100%;
    height: max-content;
    margin: 1em 0;
    padding: 1em 1em;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 2px #888888;
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
    // itemTitle, 
    // price, 
    // description, 
    // allergens, 
    // patty, 
    item,  
    onBtnClickHandler, 
    onChangeRadioHandler }) {


    return(
        <StyledSection>
                <StyledTitle>{item.itemTitle}</StyledTitle>
                <p>{item.description}</p>
                <StyledList>Allergens:
                    {
                        item.allergens.map(item => {
                            return(
                                <StyledListItem key={item}>
                                    {item}
                                </StyledListItem>
                            )
                        })
                    }
                </StyledList>
                <form onChange={e => onChangeRadioHandler(e)}>
                    {
                        item.patty.map(item => {
                            return(
                                <RadioInput radioValue={item} key={item} radioName='Patty' />
                            )
                        })
                    }
                </form>
                <div>
                    <h4>{item.price}</h4>
                </div>
                <Btn onBtnClickHandler={() => onBtnClickHandler(item)} btnText='add to cart' />

        </StyledSection>
    )
}

export default MenuItemCard;