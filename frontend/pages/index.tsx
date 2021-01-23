import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Button } from '@material-ui/core';

const Home: NextPage = () => {
  console.log('Home');

  return (
    <>
      <Head>
        <title>Home | Med</title>
      </Head>
      <div>
        <Button variant="contained" color="primary">
          Hello World
        </Button>
      </div>
    </>
  );
};

export default Home;
