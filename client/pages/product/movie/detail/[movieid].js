import { useEffect, useState } from "react";
import { option } from "../../../api/auth/[...nextauth]";
import { GET_MOVIE_DETAIL } from "../../../../api/url/enum/movie.api.url";
import { getServerSession } from "next-auth";
import makeAxiosInstance from "../../../../middleware/axiosInstance";
import Movie from "../../../../models/movie";
import Btn from "../../../../Component/Common/Button";
import { useRouter } from "next/router";
import { getMovieLikeByMovieid, getMovieListForGetMovieInfo, movieAddOrCancleLike } from "../../../../api/movie";
import { getSession } from "next-auth/react";
import setError from '../../../../middleware/axiosErrorInstance';
import KakaoShare from "../../../../common/sns/kakaoShare";

const MovieDetail = (props) => {

    const [movieDetail, setMovieDetail] = useState(null);
    const [likeStatus, setLikeStatus] = useState(false);
    const [likeTotalCount, setLikeTotalCount] = useState(0);
    const router = useRouter();

    useEffect(()=>{
        
        const movie = new Movie().createMovieByApiData(props.movie);
        setMovieDetail(movie);
        const param = [{movieid:props.movie.id}];
        ( async () => {
            const {data} = await getMovieListForGetMovieInfo(param);
            let likeCount = 0;
            if(data) {
                likeCount = data[0].likeCount;
            }
            setLikeTotalCount(likeCount);
        })();

    },[]);

    useEffect(()=>{
        ( async () => {
            const {data} = await getMovieLikeByMovieid(props.movie.id);
            if(data) {
                setLikeStatus(data.status);
            }
        })();
    },[]);


    const backBtnHandler = () => {

        router.push({
            pathname:`/product/movie`,
            query:{
                nowPage: router.query.backPage
            },

        },'/product/movie')
    }

    const addLikeMovie = async () => {
        const session = await getSession();
        if(!session) {
            setError({response:{data:{message:"로그인이 필요한 서비스 입니다."}, status:401}});
        }
        const likeData = {
            movieid : movieDetail.getMovieId(),
            status : likeStatus
        }
        const {data} = await movieAddOrCancleLike(likeData);
        setLikeStatus(data.status);

        if(likeStatus) {
            setLikeTotalCount(likeTotalCount-1);
        } else {
            setLikeTotalCount(likeTotalCount+1);
        }
    }

    const shareSns = () => {
        console.log('shareSns');
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
            <Btn title={`like ${likeStatus ? 'O' : 'X' } [${likeTotalCount}]`} onClick={addLikeMovie}/>
            {/* <Btn title={`share`} onClick={shareSns}/> */}
            <KakaoShare />
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