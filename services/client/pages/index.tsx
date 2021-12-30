import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

// import { buildClient } from '../lib/axios';
// import Image from 'next/image';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
};

// Home.getInitialProps = async ({ req }) => {
//   const reqqq = req;
//   const axios = buildClient(req);
// };

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  return {
    props: {
      time: new Date().toISOString(),
    },
  };
};

export default Home;
