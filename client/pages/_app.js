import '../styles/globals.css'
import Layout from '../Layout/layout';
import ErrorBoundary from '../error/ErrorBoundary'; 
import { useState } from 'react';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps }) {

  const [interval, setInterval] = useState(0);

  return (
          <SessionProvider session={pageProps.session} refetchInterval={interval}>
          <Layout>
              <ErrorBoundary>
                <Component {...pageProps} />
              </ErrorBoundary>
          </Layout>
          </SessionProvider>
  );
}

export default MyApp
