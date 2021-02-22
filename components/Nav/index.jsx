import styled from 'styled-components';
import React from 'react'; 

const StyledNav = styled.nav`
    height: 100px;
    width: 100%;
    background-color: lightgray;
`;

function Nav() {

    return(
        <StyledNav>
            <h4>BB</h4>
        </StyledNav>
    )
}

export default Nav;