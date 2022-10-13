import React from 'react'
import  More  from '../../images/svg/more'
import Star from '../../images/svg/star'
import Rate from './Rate'
import { useRouter } from 'next/router'
import Image from 'next/image'
import CoinNameRow from './CoinNameRow'



const styles = {
  tableRow: `text-white border-b border-gray-800 text-[0.93rem]`,
}
// coinSymbol = _ _ _   this one will be default value (String)
// coin.symbol
const CMCBoardRow = ({
  starNum,
  coinName,
  coinIcon,
  coinSymbol = '---',
  price = '----',
  hRate = '---',
  dRate = '---',
  hRateIsIncrement,
  dRateIsIncrement,
  marketCapValue = '---',
  volumeValue = '---',
  volumeCryptoValue = '---',
  circulatingSupply = '---',

}) => {


  const graphImages = [
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/52.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/1.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/825.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/3408.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/5426.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/7129.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/3957.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/328.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/2416.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/1765.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/2099.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/7653.svg',
  ]

  const getRandomGraph = () => {
    const randomInt = Math.floor(Math.random() *10) +1;
    return graphImages[randomInt];
  }

  const router = useRouter();

  const viewCoinDetails = () =>{
    router.push(
      `/currencies/info?symbol=${coinSymbol}&coin=${coinName}&price=${price}`,

    )
  }

  const viewPrice = () =>{
    router.push(`/currencies/price?symbol=${coinSymbol}&coin=${coinName}&price=${price} `)
  }

  const formartNumber = num =>{
    return Number(num.toFixed(2)).toLocaleString()
  }

  return (
       <tbody className={styles.tableRow}>
      <tr>
        <td>
          <Star />
        </td>
        <td>{starNum}</td>

        {coinIcon && coinIcon ? (
          <td className='cursor-pointer'>
            <CoinNameRow
              name={coinName}
             icon={coinIcon}
              clicked={viewCoinDetails}
            />
          </td>
        ) : (
          <></>
        )}

        <td className='cursor-pointer' onClick={viewPrice}>
          <p>${formartNumber(price)}</p>
        </td>
        <td>
          <Rate isIncrement={hRateIsIncrement} rate={`${formartNumber(hRate)}%`} />
        </td>
        <td>
          <Rate isIncrement={dRateIsIncrement} rate={`${formartNumber(dRate)}%`} />
        </td>

        <td>
          <div>
            <p>${formartNumber(marketCapValue)}</p>
          </div>
        </td>

        <td>
          <div>
            <p>{formartNumber(volumeValue)}</p>
            <p className='text-gray-400'>
              {formartNumber(volumeCryptoValue)} {coinSymbol}
            </p>
          </div>
        </td>

        <td>
          <div>
            <p>{formartNumber(circulatingSupply)}</p>
          </div>
        </td>

        <td>
          <Image src={getRandomGraph()} width={150} height={60} alt='' />
        </td>

        <td>
          <More />
        </td>
      </tr>
    </tbody>
  )
}

export default CMCBoardRow