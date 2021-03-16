import React from 'react';
import styled from 'styled-components';
import theme from '../../utils/theme';
import { StyledBtn } from '../../components/StyledBtn';

function OldOrderItem({ item }) {

const StyledSection = styled.section`
    width: 100%;
    padding: 1em;
    background-color: ${props => props.theme.colors.gray};
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

    return(
        <StyledSection>
            <div>
            {
                item.order.map(item => 
                <p>{item.count} x {item.title}
                    {
                        item.extras && item.extras.map(item => <span style={{marginLeft: '1.5em', display: 'block'}}>+ {item}</span>)
                    }
                </p>)
            }
            {item.timeOfOrder && <p>{item.timeOfOrder.date}</p>}
            </div>
            <StyledBtn>Order again</StyledBtn>
        </StyledSection>
    )
};

export default OldOrderItem;