import Nav from '../components/Nav';
import GlobalStyle from '../components/GlobalStyle';
import '../styles/globals.css';
import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';

function MyApp({ Component, pageProps }) {
  return (
      <AuthProvider>
        <GlobalStyle />
        <Nav />
        <Component {...pageProps} />
      </AuthProvider>
    )
}

export default MyApp
