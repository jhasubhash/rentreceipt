import type { NextPage } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic';


const ReceiptHandler = dynamic(() => import('../components/Receipt'), {
  ssr: false,
});

const Home: NextPage = () => {
  return <>
  <Head>
      <title>Rent Receipt Generator</title>
      <meta name="description" content="Rent Receipt" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <ReceiptHandler/>
    </>;
}

export default Home
