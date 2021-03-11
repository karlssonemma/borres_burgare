import styled from 'styled-components';
import React from 'react'; 
import { PageTitle } from '../PageTitle';

const StyledNav = styled.nav`
    height: 100px;
    width: 100%;
    background-color: lightgray;
`;

function Nav() {

    return(
        <StyledNav>
            <PageTitle>BB</PageTitle>
        </StyledNav>
    )
}

export default Nav;