import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MoviePages from "../../../models/movie/pages";
import { getSession } from "next-auth/react";
import { getMovieListForGetMovieInfo, movieGetUpcommingMovieList, movieLikeListForUser } from "../../../api/movie";
import { Grid, Pagination, Stack, Typography } from "@mui/material";
import MovieCard from "../../../Component/Movie/Card";
import StaticPagenation from "../../../Component/Movie/StaticPagenation";
import MovieSort from "../../../Component/Movie/Sort";
import { SORT_LIKE, SORT_POPULARITY, SORT_RELEASE_DATE, SORT_VOTE_AVERAGE } from "../../../common/enum/sort";

const UpcommingMovie = (props) => {
    const router = useRouter();
    const [movieList, setMovieList] = useState([]);
    const [nowPage, setNowPage] = useState(router.query.nowPageNo || 1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(()=>{
        const moviePages = new MoviePages(props.totalPages, props.totalResults);
        setTotalPages(moviePages.getTotalPages());
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

    const sortingExcute = (list, compareItemName, compareItemType, orderType = null) => {
        let newList = [...list].sort((a,b) => {
            if(compareItemType === 'date') {
                if(orderType === 1) {
                    return new Date(b[compareItemName]) - new Date(a[compareItemName]);
                }
                return new Date(a[compareItemName]) - new Date(b[compareItemName]);
            } else {
                if(orderType === 1) {
                    return b[compareItemName] - a[compareItemName];
                }
                return a[compareItemName] - b[compareItemName];
            }
        })
        return newList;
    }
    const pageChangeHandler = async (event, value) => {
        setNowPage(value);
        const {data:{results}} = await movieGetUpcommingMovieList(value);
        await movieListRender(results);
    }

    return ( 
        <>
            <Typography variant="h5" component="div" sx={{mb:5}}>
                UPCOMMING MOVIE
            </Typography>
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

export default UpcommingMovie;