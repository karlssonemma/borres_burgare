import Nav from '../components/Nav';
import GlobalStyle from '../components/GlobalStyle';
import '../styles/globals.css';
import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import { Basket } from '../contexts/BasketContext';
import { ThemeProvider } from 'styled-components';
import theme from '../utils/theme';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Basket>
          <GlobalStyle />
          <Nav />
          <Component {...pageProps} />
        </Basket>
      </AuthProvider>
    </ThemeProvider>
      
    )
}

export default MyApp
