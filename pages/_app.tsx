import React from 'react';
import { AppProps } from 'next/app';

import Layout from 'containers/Layout';
import { ProgressProvider } from 'contexts/ProgressContext';

import 'styles/index.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProgressProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ProgressProvider>
  );
}
export default MyApp;
