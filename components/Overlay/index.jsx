import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const Background = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: black;
    opacity: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    /* display: none; */
`;

const Info = styled.section`
    width: 50%;
    height: 50%;
`;

const Overlay = () => {

    return(
        <>
            <Background>
                <Info>
                    <img 
                        src={'https://res.cloudinary.com/norgesgruppen/images/c_scale,dpr_auto,f_auto,q_auto:eco,w_1600/ikfq076wqj996ei0rv3f/hjemmelaget-burger-med-bacon-cheddarost-og-rodlok'}
                    />
                </Info>
            </Background>
        </>
    )
}

export default Overlay;