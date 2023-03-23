import '../styles/globals.css'
import Layout from '../Layout/layout';
import ErrorBoundary from '../error/ErrorBoundary'; 
import { useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import SessionLoader from '../middleware/SessionLoader';
import AxiosProvider from '../middleware/axiosProvider';

function MyApp({ Component, pageProps }) {

  const [interval, setInterval] = useState(0);

  return (
        <Layout>
          <SessionProvider session={pageProps.session} refetchInterval={interval}>
              <ErrorBoundary>
              <Component {...pageProps} />
              </ErrorBoundary>
          </SessionProvider>
      </Layout>
  );
}

export default MyApp
