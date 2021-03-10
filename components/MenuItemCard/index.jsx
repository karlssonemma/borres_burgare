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

const StyledSection = styled.section`
    width: 100%;
    height: 400px;
    grid-column: 1 / span 3;

    display: flex;
    flex-direction: column;
    border-radius: 10px;
    /* box-shadow: 0px 0px 10px 2px #888888; */
    border: 1px solid #a3a3a3;
    cursor: pointer;
    overflow: hidden;
    padding: 1em;
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

const StyledForm = styled.form`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);

`;


function MenuItemCard({ menu_item }) {


    const { register, handleSubmit, errors } = useForm();
    const basket = useBasket();
    const [extras, setExtras] = useState(null);

    const extrasColl = firebaseInstance.firestore().collection('extras');

    useEffect(() => {  
        if (extras === null) {
            let extrasArr = [];
            extrasColl.get()
            .then(query => {
                query.forEach(doc => {
                    extrasArr.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })
            setExtras(extrasArr)
            })
        }
    }, [])

    const handleAdd = (menu_item, patty, addOns) => {
        basket.addProduct({
            title: menu_item.title,
            price: menu_item.price,
            id: menu_item.id,
            count: 1,
            total: menu_item.price,
            patty: patty,
            extras: addOns
        });
    };

    const onSubmit = (data) => {
        let patty = data.Patty;
        let addOns = data.extras;
        handleAdd(menu_item, patty, addOns)
    };
 

    return(
        <StyledSection>
                {/* <StyledImg src={'https://res.cloudinary.com/norgesgruppen/images/c_scale,dpr_auto,f_auto,q_auto:eco,w_1600/ikfq076wqj996ei0rv3f/hjemmelaget-burger-med-bacon-cheddarost-og-rodlok'} /> */}
                    <StyledTitle>{menu_item.title}</StyledTitle>
                    <p>{menu_item.description}</p>
                    <h4>{menu_item.price} NOK</h4>
                    <StyledForm className='choosePatty' onSubmit={handleSubmit(onSubmit)}>
                        <section>
                            <h3>Choose your patty</h3>
                        {
                            menu_item.patty && menu_item.patty.map(item => {
                                    return(
                                        <RadioInput
                                            radioValue={item} 
                                            key={item}
                                            radioName='Patty'
                                            formRef={register}
                                        />
                                    ) 
                            })
                        }
                        </section>
                        <section>
                            <h3>Anything extra?</h3>
                            {
                                (menu_item.category === 'burger' && extras) && extras.map(item => {
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
                                            inputName='extras'
                                            inputValue={item.title}
                                            price={item.price}
                                            formRef={register}
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