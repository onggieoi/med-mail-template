import React from 'react';
import { AppProps } from 'next/app';
import NProgress from 'nprogress';
import Router from 'next/router';

NProgress.configure({
  minimum: 0.1,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Component { ...pageProps } />
  );
}
export default MyApp;
