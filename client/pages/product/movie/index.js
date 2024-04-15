import { getServerSession } from "next-auth";
import { option } from "../../api/auth/[...nextauth]";
import makeAxiosInstance from "../../../middleware/axiosInstance";
import { GET_MOVIE_POPULAR_LIST } from "../../../api/url/enum/movie.api.url";
import { useEffect, useState } from "react";
import MovieCard from "../../../Component/Movie/Card";
import Link from "next/link";
import { Pagination, PaginationItem } from "@mui/material";
import { getMovieListForGetMovieInfo, movieGetPopularList, movieLikeListForUser } from "../../../api/movie";
import { useRouter } from "next/router";
import MoviePages from "../../../models/movie/pages";
import { getSession, useSession } from "next-auth/react";
import setError from '../../../middleware/axiosErrorInstance';
import { PAGE_DETAIL } from "../../../api/url/enum/movie.page.url";

const MovieListPage = (props) => {
    const router = useRouter();

    const [movieList, setMovieList] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    // const [totalResults, setTotalResults] = useState(0);
    const [nowPage, setNowPage ] = useState(Number.parseInt(router.query.nowPage) || 1);


    useEffect(()=>{
        const moviePages = new MoviePages(props.totalPages, props.totalResults);
        setTotalPages(moviePages.getTotalPages());
        // setTotalResults(props.totalResults);

        (async () => {
            await movieListRender(props.popularMovieList);
        })();
        return () => {}
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
        const {data:{results}} = await movieGetPopularList(value);
        await movieListRender(results);
    }

    return (
        <>
            <div>
                <Pagination
                    count={totalPages}
                    page={nowPage}
                    onChange={pageChangeHandler}
                />
            </div>
            <div>
                <div>list page</div>
                {
                    movieList && 
                    movieList.map((item, index) => {
                        
                        return (

                        <div key={index} 
                            style={{padding:5}}
                        >
                            <Link href={{
                               pathname : `${PAGE_DETAIL}/${item.id}`,
                               query : {
                                backPage:nowPage,
                               }
                            }}
                                as={`${PAGE_DETAIL}/${item.id}`}
                            >
                                <MovieCard movie={item}/>
                            </Link>
                        </div>
                        );
                    })
                }
            </div>
            <div>
            <Pagination
                count={totalPages}
                page={nowPage}
                onChange={pageChangeHandler}
            />
            </div>
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
            popularMovieList : data?.results,
            totalPages : data?.total_pages,
            totalResults : data?.total_results,
        },
      }
}