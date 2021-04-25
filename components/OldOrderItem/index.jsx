import React from 'react';
import styled from 'styled-components';
import theme from '../../utils/theme';
import { StyledBtn } from '../../components/Buttons/StyledBtn';
import CartProduct from '../CartProduct';
import { useBasket } from '../../contexts/BasketContext';
import { useRouter } from 'next/router';

const StyledSection = styled.li`
    width: 100%;
    height: 200px;
    padding: 1em;
    background-color: ${props => props.theme.colors.gray};
    border-radius: 10px;
    display: grid;
    grid-template-columns: auto max-content;
    /* justify-content: space-between;
    align-items: center; */
`;

const RightColumn = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
`;

const LeftColumn = styled.div`
    height: 100%;
    width: 100%;
    overflow: scroll;
`;

function OldOrderItem({ item, disabled }) {

    const router = useRouter();
    const basket = useBasket();

    const handleOrder = (item) => {
        basket.setProducts(item.order);
        router.push('/order');
        };

    return(
        <StyledSection>
            <LeftColumn>
            {
                item.order.map(item => {
                    return(
                        <CartProduct item={item} key={Math.floor(Math.random() * 1000)}/>
                    )
                })
            }
            </LeftColumn>
            <RightColumn>
                {item.timeOfOrder && <p>{item.timeOfOrder.date}</p>}
                <StyledBtn onClick={() => handleOrder(item)} disabled={disabled}>Order again</StyledBtn>
            </RightColumn>
        </StyledSection>
    )
};

export default OldOrderItem;