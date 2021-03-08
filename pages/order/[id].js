import styled from 'styled-components';
import React from 'react';
import firebaseInstance from '../../config/firebase';

export const getStaticPaths = async () => {
    const res = await firebaseInstance.firestore().collection('burgers');
    const data = await res.get();

    const itemArr = [];

    data.forEach(item => {
        itemArr.push({
            id: item.id,
            ...item.data()
        });
    });

    const paths = itemArr.map(item => {
        return {
            params: { id: item.id.toString() }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.id;
    const res = await firebaseInstance.firestore().collection('burgers');
    const data = await res.get();
    const menu_item = await data.json();

    return { props: { menu_item: menu_item } }
}

function ModifyPage({ menu_item }) {

    return(
        <div>
            <h1>{menu_item.title}</h1>
        </div>
    )
}

export default ModifyPage;