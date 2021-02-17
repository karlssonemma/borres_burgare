import Nav from '../components/Nav';
import GlobalStyle from '../components/GlobalStyle';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Nav />
      <Component {...pageProps} />
    </>
    )
}

export default MyApp
