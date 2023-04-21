import { useEffect, useState } from "react";
import { option } from "../../../api/auth/[...nextauth]";
import { GET_MOVIE_DETAIL } from "../../../../api/url/enum/movie.api.url";
import { getServerSession } from "next-auth";
import makeAxiosInstance from "../../../../middleware/axiosInstance";
import Movie from "../../../../models/movie";
import Btn from "../../../../Component/Common/Button";
import { useRouter } from "next/router";

const MovieDetail = (props) => {

    const [movieDetail, setMovieDetail] = useState(null);
    const router = useRouter();

    useEffect(()=>{
        
        const movie = new Movie().createMovieByApiData(props.movie);
        setMovieDetail(movie);
    },[]);

    const backBtnHandler = () => {

        router.push({
            pathname:`/product/movie`,
            query:{
                nowPage: router.query.backPage
            },

        },'/product/movie')
    }

    const addLikeMovie = () => {
        console.log('like', movieDetail)

    }

    return (
        <>
        { movieDetail &&
        <>
            <div>id:{movieDetail.id}</div>
            <div>title:{movieDetail.title}</div>
            <div>overview : {movieDetail.overview}</div>
            <div>poster_path : {movieDetail.poster_path}</div>
            <div>release date : {movieDetail.release_date}</div>
            <div>image path : {movieDetail.getImageFullPath()}</div>
            moviedetail;
        </>
        }
        <Btn title={`back`} onClick={backBtnHandler}/>
        <div>
            <Btn title={`like`} onClick={addLikeMovie}/>

        </div>
        </>
    )
}

export default MovieDetail;

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, option);
    const axios = await makeAxiosInstance(session);

    const {params:{movieid}} = context;

    const {data} = await axios.get(`${GET_MOVIE_DETAIL}/${movieid}`);
    return {
        props: {
            movie : data, 
        },
      }
}