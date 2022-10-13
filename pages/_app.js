import '../styles/globals.css'
import {MoralisProvider} from 'react-moralis';
import { CoinMarketProvider } from '../context/context';


function MyApp({ Component, pageProps }) {
  return (
  
  
    <MoralisProvider  appId={process.env.NEXT_PUBLIC_APP_ID} serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}>
      <CoinMarketProvider>
         <Component {...pageProps} />

      </CoinMarketProvider>

  </MoralisProvider>  )
}

export default MyApp
