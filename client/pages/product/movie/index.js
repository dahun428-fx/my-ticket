import { getServerSession } from "next-auth";
import { option } from "../../api/auth/[...nextauth]";
import makeAxiosInstance from "../../../middleware/axiosInstance";
import { GET_MOVIE_POPULAR_LIST } from "../../../api/url/enum/movie.api.url";
import { useEffect, useState } from "react";
import MovieCard from "../../../Component/Movie/Card";
import Link from "next/link";
import { Box, Grid, Pagination, PaginationItem, Tab, Tabs } from "@mui/material";
import { getMovieListForGetMovieInfo, movieGetPopularList, movieLikeListForUser } from "../../../api/movie";
import { useRouter } from "next/router";
import MoviePages from "../../../models/movie/pages";
import { getSession, useSession } from "next-auth/react";
import setError from '../../../middleware/axiosErrorInstance';
import { PAGE_DETAIL } from "../../../api/url/enum/movie.page.url";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PopularMovie from "./popularMovie";

const MovieListPage = (props) => {
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>

        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Popular Movie" value="1" />
                    <Tab label="Item Two" value="2" />
                    <Tab label="Item Three" value="3" />
                </TabList>
                </Box>
                <TabPanel value="1">
                    <PopularMovie 
                        popularMovieList={props.popularMovie.popularMovieList}  
                        totalPages={props.popularMovie.totalPages}
                        totalResults={props.popularMovie.totalResults}
                    />
                </TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
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

    const {data} = await axios.get(`${GET_MOVIE_POPULAR_LIST}/${nowPage}`);
    return {
        props: {
            popularMovie : {
                popularMovieList : data?.results,
                totalPages : data?.total_pages,
                totalResults : data?.total_results,
            }
        },
      }
}