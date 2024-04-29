import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import makeAxiosInstance from "../../../middleware/axiosInstance";
import { GET_MOVIE_GENRES, SEARCH_KEYWORD, SEARCH_MOVIE } from "../../../api/url/enum/movie.api.url";
import { option } from "../../api/auth/[...nextauth]";
import { searchMovieList } from "../../../api/movie";
import SearchMovie from "../movie/searchMovie";
import { Box } from "@mui/material";
import ListTitle from "../../../Component/Movie/ListTitle";

const SearchList = (props) => {

    const router = useRouter();
    const [isRefreshing, setIsRefreshing] = useState(false);

    const [movieList, setMovieList] = useState(null);
    const [totalPages, setTotalPages] = useState(1); 
    const [totalResults, setTotalResults] = useState(0);
    const [keyword, setKeyword] = useState(router.query?.keyword);
    const [searchKeywords, setSearchKeywords] = useState([]);

    useEffect(()=>{
        refreshData();
        setKeyword(decodeURIComponent(router.query?.keyword));
        (async () => {
            // const {data} = await searchMovieList({keyword: keyword, pageNumber : 1});
            if(!props.keyword) {
                setMovieList(null);
                setTotalPages(1);
                setTotalResults(0);
                setSearchKeyword([]);
            } else {
                setMovieList(props.results.movie.list);
                setTotalPages(props.results.movie.totalPages);
                setTotalResults(props.results.movie.totalResults);
                setSearchKeywords(props.results.searchKeywords.list);
            }
        })();
    },[props.keyword])
    useEffect(()=>{
        setIsRefreshing(false);
    },[props.keyword]);

    const refreshData = () => {
        router.replace(router.asPath);
        setIsRefreshing(true);
    }


    return (
        <>
        {
            !isRefreshing && 
            <Box sx={{width:'100%', padding:'24px'}} component='div' mt={2}>
                <ListTitle title={`SEARCH RESULT`} />
                <SearchMovie 
                    list={movieList}
                    totalPages={totalPages}
                    totalResults={totalResults}
                    genres={props.results.movieGenres}
                    keyword={keyword}
                    searchKeywords={searchKeywords}
                />
            </Box>

        }
        </>
    )
}
export default SearchList;

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, option);
    const axios = await makeAxiosInstance(session);

    const keyword = decodeURIComponent(context.query?.keyword);

    const nowMoviePage = context.query.nowPage || 1;

    const movieRes = await axios.get(`${SEARCH_MOVIE}/${keyword}/${nowMoviePage}`);
    const movieGenres = await axios.get(`${GET_MOVIE_GENRES}`);
    const keywordSearchRes = await axios.get(`${SEARCH_KEYWORD}/${keyword}/${nowMoviePage}`);

    return {
        props : { 
            keyword,
            results : {
                movie : {
                    list : movieRes.data?.results,
                    totalPages : movieRes.data?.total_pages,
                    totalResults : movieRes.data?.total_results,
                },
                movieGenres : movieGenres.data,
                searchKeywords : {
                    list : keywordSearchRes.data?.results,
                    totalPages : keywordSearchRes.data?.total_pages,
                    totalResults : keywordSearchRes.data?.total_results,
                }
            }
        }
    }
}