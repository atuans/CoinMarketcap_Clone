import React, {useState, useContext, useEffect, useCallback} from 'react'
import btc from '../../images/btc.png'
import { CoinMarketCapContext } from '../../context/context'
import CMCtableheader from './CMCTableHeader'
import CMCtableRow from './CMCBoardRow'
//useCallback Hook returns a memoized callback function.
// Think of memoization as caching a value so that it does not need to be recalculated.
// This allows us to isolate resource intensive functions so that they will not automatically run on every render.

// The useCallback Hook only runs when one of its dependencies update.
// prevent a component from re-rendering unless its props have changed.


const CMCBoard = () => {
  let {getTopTenCoin, getRecentlyAdded} = useContext(CoinMarketCapContext);
  let [coinData, setCoinData] = useState(null);
  //let [recentListing, setRecentListing] = useState(null);

  useEffect(()=>{
    setData()
  },[])



  // make sure get top ten coin once
  const setData = useCallback(async() =>{
     try {
      let apiResponse = await getTopTenCoin();
      let filteredResponse = [];  // only get 10 top coin

      for(let i =0; i < apiResponse.length; i++) {
        const element = apiResponse[i]; // storing a pointer to what responsed by using an index 
        if(element.cmc_rank <= 10)filteredResponse.push(element);
        //cmc_rank is the key to get the top coin rank
      }

      setCoinData(filteredResponse);

     } catch (error) {
        console.log(error.message);
     }
  },[getTopTenCoin])
  console.log(coinData);


  // this one use for enterprise and company
 // fetching the recently listed coin


  // const setRecently = useCallback(async() =>{
  //   try {
  //     let apiResponse = await getRecentlyAdded();
  //     let filteredResponse = [];

  //     for(let i=0; i< apiResponse?.length;i++){
  //       const element = apiResponse[i];
  //       if(element.cmc_rank <= 3)filteredResponse.push(element);
  //     }
  //     setRecentListing(filteredResponse);

  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }, [getRecentlyAdded])




  return (
    <div className='text-white font-bold'>
      <div className='mx-auto max-w-screen-2xl'>
        <table className='w-full'>
          <CMCtableheader/>
          
          {coinData && coinData ? (
            coinData.map((coin,index) =>{
              return(
                <CMCtableRow
                key={index}
                starNum={coin.cmc_rank}
                coinName={coin.name}
                coinSymbol={coin.symbol}
                coinIcon={btc}
                showBuy={true}
                hRate={coin.quote.USD.percent_change_24h}
                dRate={coin.quote.USD.percent_change_7d}
                hRateIsIncrement={true}
                price={coin.quote.USD.price}
                marketCapValue={coin.quote.USD.market_cap}
                volumeCryptoValue={coin.quote.USD.volume_24h}
                volumeValue={coin.total_supply}
                circulatingSupply={coin.circulating_supply}
                />
                )
              })
            ) : (
              <></>
            )}

        </table>

      </div>

    </div>
  )
}

export default CMCBoard