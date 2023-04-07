import { getServerSession } from "next-auth";
import { option } from "../../api/auth/[...nextauth]";
import makeAxiosInstance from "../../../middleware/axiosInstance";
import { GET_MOVIE_POPULAR_LIST } from "../../../api/url/enum/movie.api.url";
import { useEffect, useState } from "react";
import Movie from "../../../models/movie";
import Image from "next/image";
import MovieCard from "../../../Component/Movie/Card";

const MovieListPage = (props) => {

    const [movieList, setMovieList] = useState([]);

    useEffect(()=>{
        setMovieList(props.popularMovieList);

        return () => {setMovieList([]); }
    },[])

    return (
        <>
            <div>list page</div>
            {
                movieList && 
                movieList.map((item, index) => {
                    
                    return (

                    <div key={index} 
                        style={{padding:5}}
                    >
                        <MovieCard movie={item}/>
                    </div>
                    );
                })
            }
        </>
    )
}

export default MovieListPage;


export async function getServerSideProps(context) {

    const session = await getServerSession(context.req, context.res, option);
    const axios = await makeAxiosInstance(session);

    const {data} = await axios.get(`${GET_MOVIE_POPULAR_LIST}/1`);
    // console.log(data);
    return {
        props: {
            popularMovieList : data?.results, 
        },
      }
}