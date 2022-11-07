import '../styles/globals.css'
import {MoralisProvider} from 'react-moralis';
import { CoinMarketProvider } from '../context/context';
import { GunProvider } from '../context/gunContext';

function MyApp({ Component, pageProps }) {
  return (
  
  
    
    <MoralisProvider  appId={process.env.NEXT_PUBLIC_APP_ID} serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}>
      <GunProvider>

      <CoinMarketProvider>
         <Component {...pageProps} />

      </CoinMarketProvider>
      </GunProvider>

  </MoralisProvider>  )
}

export default MyApp
