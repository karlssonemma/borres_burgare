import React from 'react';
import firebaseInstance from '../../config/firebase';
import { useBasket } from '../../contexts/BasketContext';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { StyledBtn } from '../Buttons/StyledBtn';
import StyledCheckbox from '../FormComponents/StyledCheckbox';
import { SecondaryTitle } from '../Text/SecondaryTitle';
import Image from 'next/image';

const StyledSection = styled.li`
    width: 100%;
    height: max-content;
    padding: ${props => props.theme.space[4]};
    grid-column: 1 / span 3;

    display: flex;
    flex-direction: column;

    border-radius: 10px;
    cursor: pointer;
    overflow: hidden;
    background-color: ${props => props.theme.colors.gray};
    font-size: ${props => props.theme.fontSizes.l};
    font-family: ${props => props.theme.fonts.arial};
`;

const StyledList = styled.ul`
    height: 50px;
    padding: 0;

    list-style: none;

    display: flex;
    align-items: center;
`;

const StyledListItem = styled.li`
    display: inline-block;
    margin-left: ${props => props.theme.space[1]};
`;

const StyledForm = styled.form`
    width: 100%;
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr;
    border-top: 1px solid black;
    padding-top: ${props => props.theme.space[4]};

    @media (min-width: ${props => props.theme.breakpoints[2]}) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const Description = styled.p`
    padding: ${props => props.theme.space[3]} 0;
`;


function ModifyCard({ menu_item, extras, patties }) {

    const extrasColl = firebaseInstance.firestore().collection('extras');
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const basket = useBasket();

    const handleAdd = (menu_item, patty, addOns, totalExtras) => {
            basket.addProduct({
                title: menu_item.title,
                price: menu_item.price,
                id: menu_item.id,
                count: 1,
                total: totalExtras + menu_item.price,
                patty: patty === null ? 'Beef' : patty,
                extras: addOns,
                category: menu_item.category
            });
            
        document.querySelector('#modify-item-form').reset();
    };

    const onSubmit = (data) => {
        let totalExtras = 0;
        extrasColl.get()
        .then(query => {
            query.forEach(doc => {
                let found = data.extras.find(item => item === doc.data().title)
                if(found) {
                    totalExtras += doc.data().price;
                } 
            })
        }).then(() => {
            let patty = data.patty;
            let addOns = data.extras;
            handleAdd(menu_item, patty, addOns, totalExtras);
        })
    };

    const renderAllergens = () => {
        return(
            <StyledList>
                <span>Contains:</span>
                {
                    menu_item.allergens.map(item => {
                        let imgSrc;
                        switch(item) {
                            case 'milk':
                                imgSrc = '/allergens-milk.png';
                                break;
                            case 'egg':
                                imgSrc = '/allergens-eggs.png';
                                break;
                            case 'gluten':
                                imgSrc = '/gluten.png';
                                break;
                        }
                        return(
                            <StyledListItem key={item}>
                                <Image 
                                    src={imgSrc}
                                    width={25}
                                    height={25}
                                />
                            </StyledListItem>
                        )
                    })
                }
            </StyledList>
        )
    };
 

    return(
        <StyledSection>
            <SecondaryTitle className='product-card-title'>
                <span>{menu_item.title}</span>
                <span>{menu_item.price + ' NOK'}</span>
            </SecondaryTitle>
            <Description>{menu_item.description}</Description>
                {
                    menu_item.allergens && renderAllergens()
                }
            <StyledForm id='modify-item-form' className='choosePatty' onSubmit={handleSubmit(onSubmit)}>
                <section>
                    <SecondaryTitle>Choose your patty</SecondaryTitle>
                    {
                        patties && patties.map(item => {
                                return(
                                    <StyledCheckbox
                                        inputValue={item.title} 
                                        key={item.id}
                                        inputName='patty'
                                        register={register}
                                        inputType='radio'
                                        id={item.id}
                                        req={true}
                                    />
                                ) 
                        })
                    }
                </section>
                <section>
                    <SecondaryTitle>Anything extra?</SecondaryTitle>
                    {
                        extras && extras.map(item => {
                            return(
                                <StyledCheckbox
                                    id={item.id}
                                    key={item.id}
                                    inputName='extras'
                                    inputValue={item.title}
                                    price={item.price}
                                    register={register}
                                    inputType='checkbox'
                                />
                            )
                        })
                    }
                </section>
                <StyledBtn type='submit'>Add</StyledBtn>
            </StyledForm>
        </StyledSection>
    )
};

export default ModifyCard;