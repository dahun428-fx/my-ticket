import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MoviePages from "../../../models/movie/pages";
import { getSession } from "next-auth/react";
import { getMovieListForGetMovieInfo, movieGetNowPlayingMovieList, movieLikeListForUser } from "../../../api/movie";
import MovieCard from "../../../Component/Movie/Card";
import { Grid, Pagination, Stack } from "@mui/material";
import MovieSort from "../../../Component/Movie/Sort";
import StaticPagenation from "../../../Component/Movie/StaticPagenation";
import { SORT_LIKE, SORT_POPULARITY, SORT_RELEASE_DATE, SORT_VOTE_AVERAGE, sortingExcute } from "../../../common/functions/sort";
import ListTitle from "../../../Component/Movie/ListTitle";
import MovieList from "../../../Component/Movie/MovieList";

const NowPlayingMovie = (props) => {

    const router = useRouter();
    const [movieList, setMovieList] = useState([]);
    const [nowPage, setNowPage] = useState(router.query.nowPageNo || 1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalResults, setTotalResults] = useState(0);

    useEffect(()=>{
        const moviePages = new MoviePages(props.totalPages, props.totalResults);
        setTotalPages(moviePages.getTotalPages());
        setTotalResults(props.totalResults);
        (async () => {
            await movieListRender(props.list);
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

    const movieListAttachLikeStatus = async (movieList) => {
        const {data} = await movieLikeListForUser();
        if (data) {
            const dataMap = data.reduce((newObj, obj) => {
                newObj[obj.movieid] = obj.status;
                return newObj;
            }, {});
            const resultList = movieList.map((item, index) => {
                return {
                    ...item,
                    likeStatus : dataMap[item.id] ? dataMap[item.id] : false,
                }
            })
            return resultList;
        }
        return movieList;
    }

    const movieListAttachLikeCount = async (movieList) => {
        const param = movieList.map((item, index) => {
            return {
                movieid:item.id,
            }
        })
        const {data} = await getMovieListForGetMovieInfo(param);

        if(data) {

            const dataMap = data.reduce((newObj, obj) => {
                newObj[obj.movieid] = obj.likeCount;
                return newObj;
            }, {});
            
            const resultList = movieList.map((item, index) => {
                return {
                    ...item,
                    likeCount : dataMap[item.id] ? dataMap[item.id] : 0
                }
            })
            return resultList;
        }
        return movieList;
    }
    const changeMovieListBySortingAndOrderBy = (sortVal, orderVal) => {
        sortVal = Number.parseInt(sortVal);
        orderVal = Number.parseInt(orderVal);
        let sortedMovieList = [];
        switch (sortVal) {
            case SORT_POPULARITY:
                sortedMovieList = sortingExcute(movieList, 'popularity', 'object', orderVal);
                break;
            case SORT_RELEASE_DATE:
                sortedMovieList = sortingExcute(movieList, 'release_date', 'date', orderVal);
                break;
            case SORT_LIKE:
                sortedMovieList = sortingExcute(movieList, 'likeCount', 'object', orderVal);
                break;
            case SORT_VOTE_AVERAGE:
                sortedMovieList = sortingExcute(movieList, "vote_average", 'object', orderVal);
                break;
            default:
                sortedMovieList = sortingExcute(movieList, 'popularity', 'object', orderVal);
                break;
        }
        setMovieList(sortedMovieList);
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
                changeMovieListBySortingAndOrderBy={changeMovieListBySortingAndOrderBy} />
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
                tabValue={props.tabValue}
                genres={props.genres}
            />
        </>
    )
}

export default NowPlayingMovie;