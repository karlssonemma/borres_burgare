import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import InputField from '../InputField';
import RadioInput from '../RadioInput';
import Btn from '../Btn';
import { StyledBtn } from '../StyledBtn';
import firebaseInstance from '../../config/firebase';

const StyledSection = styled.section`
    width: 100%;
    height: 400px;
    margin: 1em;

    display: flex;
    border-radius: 10px;
    /* box-shadow: 0px 0px 10px 2px #888888; */
    border: 1px solid #a3a3a3;
    cursor: pointer;
    overflow: hidden;

    & .show {
        display: none;
    }

    & .chosen.show {
        display: block;
    }
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
    menu_item,
    item,  
    extras,
    formRef,
    runSubmit,
    handleClick
    }) {

    console.log('re-rendered component')
 

    return(
        <StyledSection>
                <StyledImg src={'https://res.cloudinary.com/norgesgruppen/images/c_scale,dpr_auto,f_auto,q_auto:eco,w_1600/ikfq076wqj996ei0rv3f/hjemmelaget-burger-med-bacon-cheddarost-og-rodlok'} />
                <div>
                    <StyledTitle>{menu_item.title}</StyledTitle>
                    <p>{menu_item.description}</p>
                    <form className='choosePatty' onSubmit={onSubmit => runSubmit(onSubmit)}>
                        {
                            menu_item.patty && menu_item.patty.map(item => {
                                    return(
                                        <RadioInput
                                            radioValue={item} 
                                            key={item}
                                            radioName='Patty'
                                            formRef={formRef}
                                        />
                                    ) 
                            })
                        }
                    <div>
                        <h4>{menu_item.price} NOK</h4>
                    </div>
                    {
                        (menu_item.category === 'burger' && extras) && extras.map(item => {
                            return(
                                    <InputField 
                                        inputType='checkbox'
                                        inputId={Math.floor(Math.random() * 1000)}
                                        labelText={item.title + ' + ' + item.price + ' NOK'}
                                        inputName='extra'
                                        inputValue={item.title}
                                        formRef={formRef}
                                        key={Math.floor(Math.random() * 1000)}
                                    />
                            )
                        })
                    }
                    <StyledBtn 
                        type='submit' 
                        key={Math.floor(Math.random() * 1000)} 
                        onClick={() => handleClick()}
                    >Add
                    </StyledBtn>
                    </form>
                    <StyledList>Allergens:
                        {
                            menu_item.allergens && menu_item.allergens.map(item => {
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