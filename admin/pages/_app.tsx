
import { AppProps } from "next/app";
import Layout from "../common/Component/Layout/layout";

export default function MyApp ({Component, pageProps}: AppProps) {

    return (
        <Layout>
            <Component {... pageProps} />
        </Layout>
    )
}
