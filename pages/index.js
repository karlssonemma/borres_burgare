import next from 'next';
import { PageTitle } from '../components/PageTitle';
import Link from 'next/link';
import CenteredMain from '../components/CenteredMain';
import styled from 'styled-components';
import theme from '../utils/theme';

const StyledLink = styled.a`
  font-size: ${props => props.theme.fontSizes.xl};
`;

export default function Home() {
  return (
    <CenteredMain style={{flexDirection: 'row', justifyContent: 'center'}}>
      <Link href='/login'>
        <StyledLink>Log In</StyledLink>
      </Link>
      <p>/</p>
      <Link href='/signup'>
        <StyledLink>Sign Up</StyledLink>
      </Link>
    </CenteredMain>
  )
}
