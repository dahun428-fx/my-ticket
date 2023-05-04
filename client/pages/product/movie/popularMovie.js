import { Box, FormControl, Grid, InputLabel, MenuItem, Pagination, Select, Stack, Typography } from "@mui/material";
import Link from "next/link";
import MovieCard from "../../../Component/Movie/Card";
import { PAGE_DETAIL } from "../../../api/url/enum/movie.page.url";
import { getServerSession } from "next-auth";
import makeAxiosInstance from "../../../middleware/axiosInstance";
import { GET_MOVIE_POPULAR_LIST } from "../../../api/url/enum/movie.api.url";
import { useEffect, useState } from "react";
import MoviePages from "../../../models/movie/pages";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { getMovieListForGetMovieInfo, movieGetPopularList, movieLikeListForUser } from "../../../api/movie";
import { ORDER_BY_ASC, ORDER_BY_DESC, POPULARITY, RELEASE_DATE, SORT_LIKE, SORT_POPULARITY, SORT_RELEASE_DATE, SORT_VOTE_AVERAGE, toMessage, toMessageOrderBy, toMessageSort } from "../../../common/enum/sort";

const PopularMovie = (props) => {
    const router = useRouter();
    const [movieList, setMovieList] = useState([]);
    const [nowPage, setNowPage ] = useState(Number.parseInt(router.query.nowPage) || 1);
    const [totalPages, setTotalPages] = useState(0);
    const [sortValue, setSortValue] = useState(SORT_POPULARITY);
    const [orderbyValue, setOrderbyValue] = useState(ORDER_BY_DESC);

    useEffect(()=>{
        const moviePages = new MoviePages(props.totalPages, props.totalResults);
        setTotalPages(moviePages.getTotalPages());
        (async () => {
            await movieListRender(props.popularMovieList);
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
    const pageChangeHandler = async (event, value) => {
        setNowPage(value);
        setSortValue(SORT_POPULARITY);
        setOrderbyValue(ORDER_BY_DESC);
        const {data:{results}} = await movieGetPopularList(value);
        await movieListRender(results);
    }
    const orderbyChangeHandler = (e) => {
        let { value } = e.target;
        setOrderbyValue(value);
        changeMovieListBySortingAndOrderBy(sortValue, value);
    }

    const sortChangeHandler = (e) => {
        let {value} = e.target;
        setSortValue(value);
        changeMovieListBySortingAndOrderBy(value, orderbyValue);
    }

    const changeMovieListBySortingAndOrderBy = (sortVal, orderVal) => {
        sortVal = Number.parseInt(sortVal);
        orderVal = Number.parseInt(orderVal);
        let sortedMovieList = [];
        switch (sortVal) {
            case SORT_POPULARITY:
                sortedMovieList = sortingByPopularity(movieList, orderVal);
                break;
            case SORT_RELEASE_DATE:
                sortedMovieList = sortingByDate(movieList, orderVal);
                break;
            case SORT_LIKE:
                sortedMovieList = sortingByLikeCount(movieList, orderVal);
                break;
            case SORT_VOTE_AVERAGE:
                sortedMovieList = sortingByVoteAverage(movieList, orderVal);
                break;
            default:
                sortedMovieList = sortingByPopularity(movieList, orderVal);
                break;
        }
        setMovieList(sortedMovieList);
    }

    const sortingByPopularity = (movieList, orderType = null) => {
        let sortedMovieList = [...movieList].sort((a,b)=> {
            if(orderType === ORDER_BY_DESC) {
                return b.popularity - a.popularity;
            }
            return a.popularity - b.popularity;
        })
        return sortedMovieList;
    }

    const sortingByLikeCount = (movieList, orderType = null) => {
        let sortedMovieList = [...movieList].sort((a,b) => {
            if(orderType === ORDER_BY_DESC) {
                return b.likeCount - a.likeCount;
            }
            return a.likeCount - b.likeCount;
        })
        return sortedMovieList;
    }

    const sortingByDate = (movieList, orderType = null) => {
        let sortedMovieList = [...movieList].sort((a,b) => {
            if(orderType === ORDER_BY_DESC) {
                return new Date(b.release_date) - new Date(a.release_date);
            }
            return new Date(a.release_date) - new Date(b.release_date);
        })
        return sortedMovieList;
    }

    const sortingByVoteAverage = (movieList, orderType = null) => {
        let sortedMovieList = [...movieList].sort((a,b) => {
            if(orderType === ORDER_BY_DESC) {
                return b.vote_average - a.vote_average;
            }
            return a.vote_average - b.vote_average;
        })
        return sortedMovieList;
    }

    return (
        <>
            <Typography variant="h5" component="div" sx={{mb:5}}>
                POPULAR MOVIE
            </Typography>
                <Stack alignItems="center" sx={{mb:2}}>
                {/* <Pagination
                    count={totalPages}
                    page={nowPage}
                    onChange={pageChangeHandler}
                    /> */}
                <Box component="div" sx={{alignItems:'center'}}>
                    <FormControl >
                        <InputLabel id="orderby-select-label">차순</InputLabel>
                        <Select
                            labelId="orderby-select-label"
                            label="차순"
                            value={orderbyValue}
                            onChange={orderbyChangeHandler}
                        >
                            <MenuItem value={ORDER_BY_DESC}>{toMessageOrderBy(ORDER_BY_DESC)}</MenuItem>
                            <MenuItem value={ORDER_BY_ASC}>{toMessageOrderBy(ORDER_BY_ASC)}</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl >
                    <InputLabel id="sort-select-label">정렬</InputLabel>
                    <Select
                        labelId="sort-select-label"
                        value={sortValue}
                        label="정렬"
                        onChange={sortChangeHandler}
                    >
                        <MenuItem value={SORT_POPULARITY}>{toMessageSort(SORT_POPULARITY)}</MenuItem>
                        <MenuItem value={SORT_RELEASE_DATE}>{toMessageSort(SORT_RELEASE_DATE)}</MenuItem>
                        <MenuItem value={SORT_LIKE}>{toMessageSort(SORT_LIKE)}</MenuItem>
                        <MenuItem value={SORT_VOTE_AVERAGE}>{toMessageSort(SORT_VOTE_AVERAGE)}</MenuItem>
                    </Select>
                    </FormControl>
                </Box>
                </Stack>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {
                    movieList && 
                    movieList.map((item, index) => {
                        
                        return (
                        <Grid xs={4} sm={4} md={3} key={index} item>
                            <MovieCard movie={item} nowPage={nowPage} tabValue={props.tabValue} genres={props.genres}/>
                        </Grid>
                        );
                    })
                }
            </Grid>
            <Stack alignItems="center" sx={{mt:2}}>
                <Pagination
                    count={totalPages}
                    page={nowPage}
                    onChange={pageChangeHandler}
                    />
            </Stack>
        </>
    )
}

export default PopularMovie;
