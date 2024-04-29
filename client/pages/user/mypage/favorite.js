import { getServerSession } from "next-auth";
import makeAxiosInstance from "../../../middleware/axiosInstance";
import { option } from "../../api/auth/[...nextauth]";
import { USER_ME, USER_PROVIDER_INFO } from "../../../api/url/enum/user.api.url";
import { GET_MOVIE_GENRES, GET_MOVIE_LIKE_BY_USER } from "../../../api/url/enum/movie.api.url";
import { useEffect, useState } from "react";
import axios from "../../../middleware/axiosInterceptorHook";
import MovieList from "../../../Component/Movie/MovieList";
import MovieCardSimilar from "../../../Component/Movie/CardSimilar";
import { getSession } from "next-auth/react";
import { movieListAttachLikeCount, movieListAttachLikeStatus } from "../../../common/functions/changeList";
import { Box, Grid, Paper } from "@mui/material";
import MovieCard from "../../../Component/Movie/Card";
import ListTitle from "../../../Component/Movie/ListTitle";
import MovieSideCard from "../../../Component/Movie/SideCard";

const MyFavorite = ({user, likeData, movieGenres}) => {

    const [movieList, setMovieList] = useState(null);

    const { GET_MOVIE_DETAIL} = require("../../../api/url/enum/movie.api.url");
    
    useEffect(()=>{
        ( async()=>{
            if(likeData && likeData.length > 0) {
                console.log('user', likeData)
                let movielist = await Promise.all (likeData.map( async (item, index) => {
                    // return item.movieid;
                    let {data:movie} = await axios.get(`${GET_MOVIE_DETAIL}/${item.movieid}`);
                    console.log('m ', movie);
                    return movie;
                }))
                movieListRender(movielist);
            }
        })();
    },[])

    const movieListRender = async (movieList) => {
        if(movieList) {
            let resultList = movieList;
            const session = await getSession();

            resultList = await movieListAttachLikeCount(movieList);
            if(session) {
                resultList = await movieListAttachLikeStatus(resultList);
            }
            setMovieList(resultList);
            console.log('result;,', resultList)
        }
    }

    const cardStyle = {
        maxWidth : 220,
        height : 330,
    }

    return (
        <>
            <Box sx={{ width: '100%', typography: 'body1' }}>
            <Box m={2}>
                <ListTitle title={`MY FAVORITE`} />
            </Box>
            { movieList && movieList.length > 0 &&
                <Box m={2} sx={{
                }}>
                    <Box mt={2}>
                        <Grid container 
                            spacing={{ xs: 2, sm:3, md: 4 }} 
                            columns={{ xs: 4, sm: 8, md: 12 }}
                        >
                            {   
                                movieList && 
                                movieList.map((item, index) => {
                                    
                                    return (
                                    <Grid 
                                        xs={3} sm={3} md={3} 
                                        key={index} item>
                                        <MovieCard cardStyle={cardStyle} movie={item} />
                                    </Grid>
                                    );
                                })
                            }
                        </Grid>
                    </Box>
                </Box>
            }
            </Box>
        </>
    )
}

export default MyFavorite;

export async function getServerSideProps(context) {
    try {
        const session = null;
        const axios = await makeAxiosInstance(session);
        const {data:user} = await axios.get(USER_ME);
        const {data:likeData} = await axios.get(GET_MOVIE_LIKE_BY_USER);
        
        
        return {
          props: {
            user, likeData
          },
        }
    } catch (error) {
         
    }

    return {
        props : {}
    }
  }

