import { useEffect, useState } from "react";
import MoviePages from "../../../models/movie/pages";
import { getSession } from "next-auth/react";
import { getMovieListForGetMovieInfo, movieLikeListForUser, searchMovieList, searchMovieListByKeywordId } from "../../../api/movie";
import { Box, Button, Chip, Divider, Grid, IconButton, Pagination, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import MovieCard from "../../../Component/Movie/Card";
import { useRouter } from "next/router";
import MovieSort from "../../../Component/Movie/Sort";
import StaticPagenation from "../../../Component/Movie/StaticPagenation";
import { SORT_LIKE, SORT_POPULARITY, SORT_RELEASE_DATE, SORT_VOTE_AVERAGE, sortingExcute } from "../../../common/functions/sort";
import SearchMovieByKeyword from "./searchMovieByKeyword";

const SearchMovie = (props) => {

    const router = useRouter();
    const [movieList, setMovieList] = useState([]);
    const [nowPage, setNowPage ] = useState(Number.parseInt(router.query.nowPage) || 1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    const [keyword, setKeyword] = useState(props.keyword || "");
    const [searchKeywords, setSearchKeywords] = useState([]);

    useEffect(()=>{
        const moviePages = new MoviePages(props.totalPages, props.totalResults);
        setTotalPages(moviePages.getTotalPages());
        setKeyword(props.keyword);
        setSearchKeywords(props.searchKeywords);
        setTotalResults(props.totalResults);
        (async () => {
            await movieListRender(props.list);
        })();
        return () => {};
    },[props.list])

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
        try {
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
            
        } catch (error) {
            console.log(error)
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
        const {data:{results}} = await searchMovieList({keyword: keyword, pageNumber: value});
        await movieListRender(results);
    }

    return (
        <>
            <Typography variant="h6" mt={5}>
            SEARCH RESULT MOVIE
            </Typography>
            <Divider/>
            <MovieSort
            nowPage={nowPage}
            changeMovieListBySortingAndOrderBy={changeMovieListBySortingAndOrderBy} />
            <StaticPagenation 
                nowPage={nowPage}
                pageChangeHandler={pageChangeHandler}
                totalPages={totalPages}
            />
            <SearchMovieByKeyword searchKeywordsList={searchKeywords} nowPage={nowPage} genres={props.genres}/>
            {/* //movieList */}
            <Box>
                <Typography variant="overline">"{keyword}" 검색 결과 총 {totalResults} 건</Typography>
                <Divider />
                <Box mt={2}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {
                            (movieList && movieList.length > 0) ? 
                            movieList.map((item, index) => {
                                
                                return (
                                <Grid xs={4} sm={4} md={3} key={index} item>
                                    <MovieCard movie={item} nowPage={nowPage} genres={props.genres}/>
                                </Grid>
                                );
                            })
                            :
                            <Grid item>검색 결과가 없습니다.</Grid>
                        }
                    </Grid>
                    <Stack alignItems="center" sx={{mt:2}}>
                        <Pagination
                            count={totalPages}
                            page={nowPage}
                            onChange={pageChangeHandler}
                            />
                    </Stack>
                </Box>
            </Box>
        </>
    )
}

export default SearchMovie;