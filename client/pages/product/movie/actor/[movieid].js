import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import makeAxiosInstance from "../../../../middleware/axiosInstance";
import { option } from "../../../api/auth/[...nextauth]";
import { GET_MOVIE_CREDITS, GET_MOVIE_DETAIL } from "../../../../api/url/enum/movie.api.url";
import Actor from "../../../../models/movie/actor";
import ListTitle from "../../../../Component/Movie/ListTitle";
import { Box, Grid, Paper } from "@mui/material";
import MovieCardActor from "../../../../Component/Movie/CardActor";

const MovieActorList = ({creditsMovie, movieid, movie}) => {

    const router = useRouter();

    const [castList, setCastList] = useState([]);
    const [crewList, setCrewList] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(()=>{
        setCastList(creditsMovie?.cast ?? []);
        setCrewList(creditsMovie?.crew ?? []);
    },[router.asPath])
    
    useEffect(()=> {
        setIsRefreshing(false);
    },[movieid])

    const refreshData = () => {
        router.replace(router.asPath);
        setIsRefreshing(true);
    }

    return (
        <>
            <Box>
                <ListTitle title={`${movie.title}`} />
            </Box>
            <Box m={2}>
                <ListTitle title={`CAST ACTOR`}/>
                <Paper variant="outlined" 
                    sx={{
                        paddingTop:1,
                    }}
                >
                <Grid container spacing={1}
                    sx={{
                        margin:'0 auto'
                    }}
                >
                    {
                        castList.length > 0 &&
                        castList.map((item, index) => {
                            return (
                                <Grid key={index} item>
                                    <MovieCardActor actor={item} />
                                </Grid>
                            )
                        })
                    }
                </Grid>
                </Paper>
            </Box>
            <Box m={2}>
                <ListTitle title={`CREW MEMBER`}/>
                <Paper variant="outlined" 
                    sx={{
                        paddingTop:1,
                    }}
                >
                <Grid container spacing={1}
                    sx={{
                        margin:'0 auto'
                    }}
                >
                    {
                        crewList.length > 0 &&
                        crewList.map((item, index) => {
                            return (
                                <Grid key={index} item>
                                    <MovieCardActor actor={item} />
                                </Grid>
                            )
                        })
                    }
                </Grid>
                </Paper>
            </Box>
        </>
    )
}

export default MovieActorList;

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, option);
    const axios = await makeAxiosInstance(session);

    const {params:{movieid}} = context;

    try {
        const movieDetailRes =  await axios.get(`${GET_MOVIE_DETAIL}/${movieid}`);
        const movieCreditsRes = await axios.get(`${GET_MOVIE_CREDITS}/${movieid}`);
        return {
            props : {
                movie: movieDetailRes.data,
                creditsMovie : {
                    cast : movieCreditsRes.data?.cast,
                    crew : movieCreditsRes.data?.crew,
                }
            }
        }
        
    } catch (error) {
        
        const {status} = error.response;
        if(status === 404) {
            return {
                notFound:true,
            }
        }
        return Promise.reject(error);
    }
}