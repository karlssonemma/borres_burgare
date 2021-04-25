import Nav from '../components/Nav';
import GlobalStyle from '../components/GlobalStyle';
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
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Spartan:wght@100;500;800&family=Syne+Mono&display=swap" rel="stylesheet" />
          <Component {...pageProps} />
        </Basket>
      </AuthProvider>
    </ThemeProvider>
      
    )
}

export default MyApp
