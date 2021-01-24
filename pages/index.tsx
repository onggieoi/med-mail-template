import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

import HomePage from 'containers/Home';
import { MailProvider } from 'contexts/MailContext';

const Home: NextPage = () => (
  <>
    <Head>
      <title>Home | Med</title>
    </Head>
    <MailProvider>
      <HomePage />
    </MailProvider>
  </>
);

export default Home;
