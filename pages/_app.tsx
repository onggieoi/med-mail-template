import React from 'react';
import { AppProps } from 'next/app';

import Layout from 'containers/Layout';

import 'styles/index.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
export default MyApp;
