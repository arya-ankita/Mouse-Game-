import '../styles/globals.css'
import Game from '../pages/Game';


function MyApp({ Component, pageProps }) {
 
  return (
    <>
    <Game/>
      {/* <App/> */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
