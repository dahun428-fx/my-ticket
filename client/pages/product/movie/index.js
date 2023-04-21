import { getServerSession } from "next-auth";
import { option } from "../../api/auth/[...nextauth]";
import makeAxiosInstance from "../../../middleware/axiosInstance";
import { GET_MOVIE_POPULAR_LIST } from "../../../api/url/enum/movie.api.url";
import { useEffect, useState } from "react";
import MovieCard from "../../../Component/Movie/Card";
import Link from "next/link";
import { Pagination, PaginationItem } from "@mui/material";
import { movieGetPopularList } from "../../../api/movie";
import { useRouter } from "next/router";
import MoviePages from "../../../models/movie/pages";

const MovieListPage = (props) => {
    const router = useRouter();

    const [movieList, setMovieList] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    // const [totalResults, setTotalResults] = useState(0);
    const [nowPage, setNowPage ] = useState(Number.parseInt(router.query.nowPage) || 1);


    useEffect(()=>{
        const moviePages = new MoviePages(props.totalPages, props.totalResults);
        setMovieList(props.popularMovieList);
        setTotalPages(moviePages.getTotalPages());
        // setTotalResults(props.totalResults);
        return () => {setMovieList([]); }
    },[])

    const pageChangeHandler = async (event, value) => {
        setNowPage(value);
        const {data:{results}} = await movieGetPopularList(value);
        setMovieList(results);
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
                               pathname : `/product/movie/detail/${item.id}`,
                               query : {
                                backPage:nowPage,
                               }
                            }}
                                as={`/product/movie/detail/${item.id}`}
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