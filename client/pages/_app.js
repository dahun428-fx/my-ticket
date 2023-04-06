import '../styles/globals.css'
import Layout from '../Layout/layout';
import ErrorBoundary from '../error/ErrorBoundary'; 
import { AxiosInterceptor } from '../middleware/axiosInterceptorHook';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import Loading from '../Component/Common/Loading';
import NJProgressBar from 'nextjs-progressbar';

function MyApp({ Component, pageProps }) {

  const [interval, setInterval] = useState(0);
  
  return (
          <SessionProvider session={pageProps.session} refetchInterval={interval}>
                  <Layout>
                      <ErrorBoundary>
                        <Suspense>
                        <AxiosInterceptor>
                          {/* <Loading {...pageProps}/> */}
                          <NJProgressBar/>
                          <Component {...pageProps} />
                        </AxiosInterceptor>
                        </Suspense>
                      </ErrorBoundary>
                  </Layout>
          </SessionProvider>
  );
}

export default MyApp;
