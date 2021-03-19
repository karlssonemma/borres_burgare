import next from 'next';
import { PageTitle } from '../components/Text/PageTitle';
import Link from 'next/link';
import CenteredMain from '../components/CenteredMain';
import styled from 'styled-components';
import theme from '../utils/theme';
import Nav from '../components/Nav';

const StyledLink = styled.a`
  font-size: ${props => props.theme.fontSizes.xl};
`;

export default function Home() {
  return (
    <>
    <Nav />
    <CenteredMain style={{flexDirection: 'row', justifyContent: 'center'}}>
      <Link href='/login'>
        <StyledLink>Log In</StyledLink>
      </Link>
      <p>/</p>
      <Link href='/signup'>
        <StyledLink>Sign Up</StyledLink>
      </Link>
    </CenteredMain>
    </>
  )
}
