import Nav from '../components/Nav';
import GlobalStyle from '../components/GlobalStyle';
import '../styles/globals.css';
import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import { Basket } from '../contexts/BasketContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Basket>
        <GlobalStyle />
        <Nav />
        <Component {...pageProps} />
      </Basket>
    </AuthProvider>
      
    )
}

export default MyApp
