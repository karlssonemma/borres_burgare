import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import firebaseInstance from '../../config/firebase';
import { useRouter } from 'next/router';

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

function ModifyPage() {

    const [burger, setBurger] = useState(null);

    const router = useRouter();
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
        <div>
            {
                burger && <p>{burger.title}</p>
            }
        </div>
    )
}

export default ModifyPage;