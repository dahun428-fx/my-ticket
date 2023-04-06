import '../styles/globals.css'
import Layout from '../Layout/layout';
import ErrorBoundary from '../error/ErrorBoundary'; 
import { Suspense, useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import Loading from '../Component/Common/Loading';

function MyApp({ Component, pageProps }) {

  const [interval, setInterval] = useState(0);

  return (
          <SessionProvider session={pageProps.session} refetchInterval={interval}>
          <Layout>
              <ErrorBoundary>
                <Suspense fallback={<Loading/>}>
                  <Component {...pageProps} />
                </Suspense>
              </ErrorBoundary>
          </Layout>
          </SessionProvider>
  );
}

export default MyApp;
