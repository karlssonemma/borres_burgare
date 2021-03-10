import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import firebaseInstance from '../../config/firebase';
import { useRouter } from 'next/router';
import { Container } from '../../components/Container';
import Cart from '../../components/Cart';
import { useBasket } from '../../contexts/BasketContext';

// export const getStaticPaths = async () => {
//     const res = await firebaseInstance.firestore().collection('burgers');
//     const data = await res.get();

//     const itemArr = [];

//     data.forEach(item => {
//         itemArr.push({
//             id: item.id,
//             ...item.data()
//         });
//     });

//     const paths = itemArr.map(item => {
//         return {
//             params: { id: item.id.toString() }
//         }
//     })

//     return {
//         paths,
//         fallback: false
//     }
// }

// export const getStaticProps = async (context) => {
//     const id = context.params.id;
    
//     const res = await firebaseInstance.firestore().collection('burgers').doc(id);
//     const data = await res.get();
//     const menu_item = data.data();
//     console.log('DATA', menu_item);

//     return { props: { menu_item: menu_item } }
// }

const StyledMain = styled.main`
    margin-top: 1em;
    width: 100vw;
    display: grid;
    grid-template-columns: auto 15vw;
`;

function ModifyPage() {

    const router = useRouter();
    const basket = useBasket();
    const [burger, setBurger] = useState(null);

    console.log(router)

    useEffect(async () => {

        const res = await firebaseInstance.firestore().collection('burgers').doc(router.query.id);
        const data = await res.get();

        let burgerItem = {
            ...data.data()
        };
        setBurger(burgerItem);
    }, [])

    return(
        <StyledMain>
            <Container>
                {
                    burger && <p>{burger.title}</p>
                }
            </Container>
            <Container>
                <Cart />
            </Container>
        </StyledMain>
    )
}

export default ModifyPage;