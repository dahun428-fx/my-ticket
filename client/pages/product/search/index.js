import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import makeAxiosInstance from "../../../middleware/axiosInstance";
import { GET_MOVIE_GENRES, SEARCH_MOVIE } from "../../../api/url/enum/movie.api.url";
import { option } from "../../api/auth/[...nextauth]";
import { searchMovieList } from "../../../api/movie";
import SearchMovie from "../movie/searchMovie";

const SearchList = (props) => {

    const router = useRouter();
    const [movieList, setMovieList] = useState(null);
    const [totalPages, setTotalPages] = useState(1); 
    const [totalResults, setTotalResults] = useState(0);
    const [keyword, setKeyword] = useState(router.query?.keyword);
    useEffect(()=>{
        setKeyword(decodeURIComponent(router.query?.keyword));
    },[router.query?.keyword]);
    useEffect(()=>{
        
        (async () => {
            const {data} = await searchMovieList({keyword: keyword, pageNumber : 1});
            console.log('data', data, 'keyword',decodeURIComponent(router.query?.keyword));
            if(!data) {
                setMovieList(null);
                setTotalPages(1);
                setTotalResults(0);
            } else {
                setMovieList(data?.results);
                setTotalPages(data?.total_pages);
                setTotalResults(data?.total_results);
            }
        })();
    },[keyword])

    return (
        <>
            <SearchMovie 
                list={movieList}
                totalPages={totalPages}
                totalResults={totalResults}
                genres={props.results.movieGenres}
                keyword={keyword}
            />
        </>
    )
}
export default SearchList;

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, option);
    const axios = await makeAxiosInstance(session);

    let keyword = decodeURIComponent(context.query?.keyword);

    const nowMoviePage = context.query.nowPage || 1;

    const movieRes = await axios.get(`${SEARCH_MOVIE}/${keyword}/${nowMoviePage}`);
    const movieGenres = await axios.get(`${GET_MOVIE_GENRES}`);

    return {
        props : { 
            results : {
                movie : {
                    list : movieRes.data?.results,
                    totalPages : movieRes.data?.total_pages,
                    totalResults : movieRes.data?.total_results,
                },
                movieGenres : movieGenres.data,
            }
        }
    }
}