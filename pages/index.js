import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import Feature from '../components/Feature'
import CMCBoard from '../components/table_rate/CMCBoard'

export default function Home() {
  return (
    <div className='min-h-screen'>
      <Header/>
      <div className='mt-10'>
        <Feature/>
        <div className='mt-20'>
          <CMCBoard/>
        </div>
      </div>
    </div>
  )
}
