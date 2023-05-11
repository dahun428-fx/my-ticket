import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { movieGetNowPlayingMovieList } from "../../../api/movie";
import {  Stack } from "@mui/material";
import MovieSort from "../../../Component/Movie/Sort";
import StaticPagenation from "../../../Component/Movie/StaticPagenation";
import { changeMovieListBySortingAndOrderBy } from "../../../common/functions/sort";
import ListTitle from "../../../Component/Movie/ListTitle";
import MovieList from "../../../Component/Movie/MovieList";
import { movieListAttachLikeCount, movieListAttachLikeStatus } from "../../../common/functions/changeList";

const NowPlayingMovie = ({totalPages, totalResults, list, genres, tabValue}) => {

    const router = useRouter();
    const [movieList, setMovieList] = useState([]);
    const [nowPage, setNowPage] = useState(router.query.nowPageNo || 1);

    useEffect(()=>{
        (async () => {
            await movieListRender(list);
        })();
        return () => {};
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
        }
    }

    const excuteSort = (sortVal, orderVal) => {
        let list = changeMovieListBySortingAndOrderBy(movieList, sortVal, orderVal);
        setMovieList(list);
    }

    const pageChangeHandler = async (event, value) => {
        setNowPage(value);
        const {data:{results}} = await movieGetNowPlayingMovieList(value);
        await movieListRender(results);
    }

    return ( 
        <>
            <ListTitle title={`NOW PLAING MOVIE`} />
            <Stack alignItems="end" sx={{mb:2}}>
                <MovieSort
                nowPage={nowPage}
                changeMovieListBySortingAndOrderBy={excuteSort} />
            </Stack>
            <StaticPagenation 
                nowPage={nowPage}
                pageChangeHandler={pageChangeHandler}
                totalPages={totalPages}
            />
            <MovieList
                totalResults={totalResults}
                movieList={movieList}
                totalPages={totalPages}
                nowPage={nowPage}
                pageChangeHandler={pageChangeHandler}
                tabValue={tabValue}
                genres={genres}
            />
        </>
    )
}

export default NowPlayingMovie;