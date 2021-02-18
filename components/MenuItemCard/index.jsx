import React from 'react';
import styled from 'styled-components';
import InputField from '../InputField';
import RadioInput from '../RadioInput';

const StyledSection = styled.section`
    width: 100%;
    height: max-content;
    margin: 1em 0;
    padding: 1em 1em;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 2px #888888;
    background-color: #f1f1f1;
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

function MenuItemCard({ itemTitle, price, description, allergens }) {

    return(
        <StyledSection>
                <StyledTitle>{itemTitle}</StyledTitle>
                <p>{description}</p>
                <StyledList>Allergens:
                    {
                        allergens.map(item => {
                            return(
                                <StyledListItem>{item}</StyledListItem>
                            )
                        })
                    }
                </StyledList>
                    <RadioInput />
                <div>
                    <h4>{price}</h4>
                </div>

        </StyledSection>
    )
}

export default MenuItemCard;