import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import makeAxiosInstance from "../../../middleware/axiosInstance";
import { SEARCH_MOVIE } from "../../../api/url/enum/movie.api.url";
import { option } from "../../api/auth/[...nextauth]";
import { searchMovieList } from "../../../api/movie";

const SearchList = (props) => {

    const router = useRouter();
    const [movieList, setMovieList] = useState(props.results.movie.list);
    const [totalPages, setTotalPages] = useState(props.results.movie.totalPages); 
    const [keyword, setKeyword] = useState("");
    // console.log(router.query.keyword);
    useEffect(()=>{
        
        // console.log('rr :: ',router.route)
        setKeyword(decodeURIComponent(router.query?.keyword));

        (async () => {
            const {data} = await searchMovieList({keyword: keyword, pageNumber : 1});
            // console.log('data' , data);
            setMovieList(data.results);
            setTotalPages(data.total_pages);
        })();
        // console.log('movieList ',movieList);
        // console.log(props.results.movie.list)
        // console.log(props.results.movie.totalPages)
        // console.log(props.results.movie.totalResults);
    },[router.query.keyword])

    

    return (
        <>
        {
            (movieList && movieList.length > 0) ? 
            <div>movie</div> 
            
            : <div>검색 결과가 없습니다.</div>
        }
        </>
    )
}
export default SearchList;

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, option);
    const axios = await makeAxiosInstance(session);

    let keyword = decodeURIComponent(context.query?.keyword);
    // console.log(keyword);
    const movieRes = await axios.get(`${SEARCH_MOVIE}/${keyword}/1`)
    // console.log(movieRes.data);

    return {
        props : { 
            results : {
                movie : {
                    list : movieRes.data?.results,
                    totalPages : movieRes.data?.total_pages,
                    totalResults : movieRes.data?.total_results,
                }
            }
        }
    }
}