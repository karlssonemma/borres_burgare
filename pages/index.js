import next from 'next';
import { PageTitle } from '../components/Text/PageTitle';
import Link from 'next/link';
import CenteredMain from '../components/CenteredMain';
import styled from 'styled-components';
import theme from '../utils/theme';
import Nav from '../components/Nav'; 
import StyledLink from '../components/StyledLink';

const BigLink = styled(StyledLink)`
  font-size: ${props => props.theme.fontSizes.xxl};
`;

const Background = styled(CenteredMain)`
  height: 85vh;
  & span {
    font-size: ${props => props.theme.fontSizes.xxl};
  }
`;
export default function Home() {
  return (
    <>
    <Nav />
    <Background style={{flexDirection: 'row', justifyContent: 'center'}}>
      <Link href='/login'>
        <BigLink>Log In</BigLink>
      </Link>
      <span>/</span>
      <Link href='/signup'>
        <BigLink>Sign Up</BigLink>
      </Link>
    </Background>
    </>
  )
}
