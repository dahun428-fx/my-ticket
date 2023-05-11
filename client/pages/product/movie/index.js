import { getServerSession } from "next-auth";
import { option } from "../../api/auth/[...nextauth]";
import makeAxiosInstance from "../../../middleware/axiosInstance";
import { GET_MOVIE_GENRES, GET_MOVIE_NOW_PLAYING, GET_MOVIE_POPULAR_LIST, GET_MOVIE_UPCOMMING } from "../../../api/url/enum/movie.api.url";
import { useEffect, useState } from "react";
import { Box, Tab } from "@mui/material";
import { useRouter } from "next/router";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PopularMovie from "./popularMovie";
import NowPlayingMovie from "./nowPlayingMovie";
import UpcommingMovie from "./upcommingMovie";

const MovieListPage = (props) => {
    const router = useRouter();
    const [tabValue, setTabValue] = useState("1");

    useEffect(()=>{
        if(router.query.tabValue) {
            setTabValue(router.query.tabValue);
        }
    },[]);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <>

        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList 
                scrollButtons="auto"
                allowScrollButtonsMobile
                variant="scrollable"
                onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Popular Movie" value="1" />
                    <Tab label="Now Playing Movie" value="2" />
                    <Tab label="UPCOMMING MOVIE" value="3" />
                </TabList>
                </Box>
                <TabPanel value="1">
                    <PopularMovie 
                        list={props.popularMovie.list}  
                        totalPages={props.popularMovie.totalPages}
                        totalResults={props.popularMovie.totalResults}
                        genres={props.movieGenres}
                        tabValue="1"
                    />
                </TabPanel>
                <TabPanel value="2">
                    <NowPlayingMovie 
                        list={props.nowPlayingMovie.list}
                        totalPages={props.nowPlayingMovie.totalPages}
                        totalResults={props.nowPlayingMovie.totalResults}
                        genres={props.movieGenres}
                        tabValue="2"
                    />
                </TabPanel>
                <TabPanel value="3">
                    <UpcommingMovie 
                        list={props.upcommingMovie.list}
                        totalPages={props.upcommingMovie.totalPages}
                        totalResults={props.upcommingMovie.totalResults}
                        genres={props.movieGenres}
                        tabValue="3"
                    />
                </TabPanel>
            </TabContext>
        </Box>
            
        </>
    )
}

export default MovieListPage;


export async function getServerSideProps(context) {

    const session = await getServerSession(context.req, context.res, option);
    const axios = await makeAxiosInstance(session);

    const nowPage = context.query.nowPage || 1;
    const tabValue = context.query.tabValue || 1;

    let popularPageNo = 1;
    let nowPlayingPageNo = 1;
    let upcommingPageNo = 1;
    if(Number.parseInt(tabValue) === 1) {
        popularPageNo = nowPage;
    } else if (Number.parseInt(tabValue) === 2 ) {
        nowPlayingPageNo = nowPage;
    } else if (Number.parseInt(tabValue) === 3) {
        upcommingPageNo = nowPage;
    }
    const popularRes = await axios.get(`${GET_MOVIE_POPULAR_LIST}/${popularPageNo}`);
    const nowPlayingRes = await axios.get(`${GET_MOVIE_NOW_PLAYING}/${nowPlayingPageNo}`);
    const upcommingRes = await axios.get(`${GET_MOVIE_UPCOMMING}/${upcommingPageNo}`)
    const movieGenres = await axios.get(`${GET_MOVIE_GENRES}`);

    return {
        props: {
            popularMovie : {
                list : popularRes.data?.results,
                totalPages : popularRes.data?.total_pages,
                totalResults : popularRes.data?.total_results,
            },
            nowPlayingMovie : {
                list : nowPlayingRes.data?.results,
                totalPages : nowPlayingRes.data?.total_pages,
                totalResults : nowPlayingRes.data?.total_results,
            },
            upcommingMovie : {
                list : upcommingRes.data?.results,
                totalPages : upcommingRes.data?.total_pages,
                totalResults : upcommingRes.data?.total_results,
            },
            movieGenres : movieGenres.data,
        },
      }
}