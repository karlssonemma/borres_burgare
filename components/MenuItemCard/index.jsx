import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import InputField from '../InputField';
import RadioInput from '../RadioInput';
import Btn from '../Btn';
import { StyledBtn } from '../StyledBtn';
import firebaseInstance from '../../config/firebase';
import { useBasket } from '../../contexts/BasketContext';
import { useForm } from 'react-hook-form';
import StyledCheckbox from '../StyledCheckbox';
import theme from '../../utils/theme';
import { SecondaryTitle } from '../../components/SecondaryTitle';
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

// const StyledTitle = styled.h3`
//     padding: .5em 0;
// `;

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
    padding-top: 1em;

    @media (min-width: ${props => props.theme.breakpoints[2]}) {
        grid-template-columns: repeat(2, 1fr);
    }
`;


function MenuItemCard({ menu_item, extras, patties, handleSetMenu }) {


    const { register, handleSubmit, errors } = useForm();
    const basket = useBasket();

    const handleAdd = (menu_item, patty, addOns) => {
        basket.addProduct({
            title: menu_item.title,
            price: menu_item.price,
            id: menu_item.id,
            count: 1,
            total: menu_item.price,
            patty: patty,
            extras: addOns,
        });
    };

    const onSubmit = (data) => {
        let patty = data.patty;
        let addOns = data.extras;
        handleAdd(menu_item, patty, addOns);
    };

    const updatePrice = (e) => {
        console.log(e.target.value)
    };

    const renderAllergens = () => {
        return(
            <StyledList>
                <span>Contains:</span>
                {
                    menu_item.allergens.map(item => {
                        if (item === 'egg') {
                            return(
                                <StyledListItem>
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
                                <StyledListItem>
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
                                <StyledListItem>
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
                {/* <StyledImg src={'https://res.cloudinary.com/norgesgruppen/images/c_scale,dpr_auto,f_auto,q_auto:eco,w_1600/ikfq076wqj996ei0rv3f/hjemmelaget-burger-med-bacon-cheddarost-og-rodlok'} /> */}
                    <SecondaryTitle className='product-card-title'>
                        <span>{menu_item.title}</span>
                        <span>{menu_item.price + ' NOK'}</span>
                    </SecondaryTitle>
                    {/* <p>{menu_item.description}</p> */}
                        {
                            menu_item.allergens && renderAllergens()
                        }
                    <StyledForm className='choosePatty' onSubmit={handleSubmit(onSubmit)} onChange={e => updatePrice(e)}>
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
                                        // <InputField 
                                        //     inputType='checkbox'
                                        //     inputId={Math.floor(Math.random() * 1000)}
                                        //     labelText={item.title + ' + ' + item.price + ' NOK'}
                                        //     inputName='extra'
                                        //     inputValue={item.title}
                                        //     formRef={register}
                                        //     key={Math.floor(Math.random() * 1000)}
                                        // />
                                        <StyledCheckbox 
                                            key={item}
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

// MenuItemCard.getInitialProps = async () => {
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

export default MenuItemCard;