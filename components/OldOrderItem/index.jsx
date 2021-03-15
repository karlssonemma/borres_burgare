import React from 'react';
import styled from 'styled-components';
import theme from '../../utils/theme';
import { StyledBtn } from '../../components/StyledBtn';

function OldOrderItem({ item }) {

const StyledSection = styled.section`
    width: 100%;
    padding: 1em;
    background-color: ${props => props.theme.colors.mudgreen};
    border-radius: 10px;
`;

    return(
        <StyledSection>
            {
                item.map(item => <p>{item.count} x {item.title}</p>)
            }
            <StyledBtn>Order again</StyledBtn>
        </StyledSection>
    )
};

export default OldOrderItem;