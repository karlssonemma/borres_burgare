import styled from 'styled-components';
import PageTitle from '../../components/KitchenNav';

const StyledNav = styled.nav`
    height: 100px;
    width: 100%;
    padding: 0 1em;
    background-color: ${props => props.theme.colors.gray};
    display: flex;
    justify-content: space-between;
    align-items: center;
`;


function KitchenNav() {
   
    return(
        <StyledNav>
            <PageTitle>BB</PageTitle>
        </StyledNav>
    )
};

export default KitchenNav;