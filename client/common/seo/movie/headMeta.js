import Head from "next/head"
import { useEffect, useState } from "react";

const HeadMeta = (props) => {

    const [movie, setMovie] = useState(null);

    useEffect(() => {
        setMovie(props.movie);
    }, [])

    return (
        <>
        {
            movie &&
            <Head>
                <meta property="og:url" content={location.href} />
                <meta property="og:type"          content="website" />
                <meta property="og:site_name"     content={process.env.NEXT_PUBLIC_SITE_NAME} />
                <meta property="og:title"         content={`${movie.title} | ${process.env.NEXT_PUBLIC_SITE_NAME}`} />
                <meta property="og:description"   content={movie.overview} />
                <meta property="og:image"         content={movie.getImageFullPath()} />
            </Head>
        }
        </>
    )
}

export default HeadMeta;