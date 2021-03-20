import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { StyledBtn } from '../Buttons/StyledBtn';
import firebaseInstance from '../../config/firebase';
import { useBasket } from '../../contexts/BasketContext';
import { useForm } from 'react-hook-form';
import StyledCheckbox from '../FormComponents/StyledCheckbox';
import { SecondaryTitle } from '../Text/SecondaryTitle';
import Image from 'next/image';

const StyledSection = styled.section`
    width: 100%;
    height: max-content;
    grid-column: 1 / span 3;

    display: flex;
    flex-direction: column;
    border-radius: 10px;

    cursor: pointer;
    overflow: hidden;
    padding: 2em;
    background-color: ${props => props.theme.colors.gray};
    font-size: ${props => props.theme.fontSizes.l};
    font-family: ${props => props.theme.fonts.arial};
`;

const StyledList = styled.ul`
    list-style: none;
    padding: 0;
    height: 50px;
    display: flex;
    align-items: center;
`;

const StyledListItem = styled.li`
    display: inline-block;
    margin-left: 0.5em;
`;

const StyledImg = styled.img`
    height: 100%;
    margin-right: 1em;
    object-fit: contain;
`;

const StyledForm = styled.form`
    width: 100%;
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr;
    border-top: 1px solid black;
    padding-top: 1.5em;

    @media (min-width: ${props => props.theme.breakpoints[2]}) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const Description = styled.p`
    padding: 1em 0;
`;


function ModifyCard({ menu_item, extras, patties }) {

    const extrasColl = firebaseInstance.firestore().collection('extras');
    const { register, handleSubmit, errors } = useForm();
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
                        if (item === 'egg') {
                            return(
                                <StyledListItem key={item}>
                                    <Image 
                                        src='/allergens-eggs.png'
                                        width={25}
                                        height={25}
                                    />
                                </StyledListItem>
                            )
                        };
                        if (item === 'milk') {
                            return(
                                <StyledListItem key={item}>
                                    <Image 
                                        src='/allergens-milk.png'
                                        width={25}
                                        height={25}
                                    />
                                </StyledListItem>
                            )
                        };
                        if (item === 'gluten') {
                            return(
                                <StyledListItem key={item}>
                                    <Image 
                                        src='/gluten.png'
                                        width={25}
                                        height={25}
                                    />
                                </StyledListItem>
                            )
                        };
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
                                        formRef={register}
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
                                    key={Math.random() * 1000}
                                    inputName='extras'
                                    inputValue={item.title}
                                    price={item.price}
                                    formRef={register}
                                    inputType='checkbox'
                                />
                            )
                        })
                    }
                </section>
                <StyledBtn
                    key={Math.floor(Math.random() * 1000)} 
                    type='submit'
                    >Add
                </StyledBtn>
            </StyledForm>
        </StyledSection>
    )
}

// ModifyCard.getInitialProps = async () => {
//     try {
//         const collection = await firebaseInstance.firestore().collection('extras');
//         const extrasColl = await collection.get();

//         const extras = [];
//         extrasColl.forEach(extra => {
//             extras.push({
//                 id: extra.id,
//                 ...extra.data()
//             });
//         });

//         return { extras }

//     } catch (error) {
//         return {
//             error: error.message
//         }
//     }
// }

export default ModifyCard;