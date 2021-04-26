import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';

import Link from 'next/link';
import CenteredMain from '../components/CenteredMain';
import styled from 'styled-components';
import Nav from '../components/Nav'; 
import StyledLink from '../components/StyledLink';

const BigLink = styled(StyledLink)`
  font-size: ${props => props.theme.fontSizes.xl};
  
  @media screen and (min-width: ${props => props.theme.breakpoints[1]}) {
    font-size: ${props => props.theme.fontSizes.xxl};
  }
`

const StyledMain = styled.main`
  height: 85vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.section`
  display: flex;
  font-size: ${props => props.theme.fontSizes.xl};
  
  @media screen and (min-width: ${props => props.theme.breakpoints[1]}) {
    font-size: ${props => props.theme.fontSizes.xxl};
  }
  
`;
export default function Home() {

  const router = useRouter();
  const { isAuthenticated } = useAuth();

  if(isAuthenticated) {
    router.push('/order')
  };

  useEffect(() => {
    let msg = 'kitchen screen -> /kitchen\nrestaurant screen -> /restaurant'
    window.alert(msg)
  }, [])

  return (
    <>
    <Nav />
    <StyledMain>
      <Container>
        <Link href='/login'>
          <BigLink>Log In</BigLink>
        </Link>
        <span>/</span>
        <Link href='/signup'>
          <BigLink>Sign Up</BigLink>
        </Link>
      </Container>
    </StyledMain>
    </>
  )
}
