import '../styles/globals.css'
import Layout from '../Layout/layout';
import ErrorBoundary from '../error/ErrorBoundary'; 

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
        <ErrorBoundary>
        <Component {...pageProps} />
        </ErrorBoundary>
      </Layout>
  );
}

export default MyApp
