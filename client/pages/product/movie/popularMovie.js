import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { movieGetPopularList } from "../../../api/movie";
import { changeMovieListBySortingAndOrderBy } from "../../../common/functions/sort";
import MovieSort from "../../../Component/Movie/Sort";
import StaticPagenation from "../../../Component/Movie/StaticPagenation";
import ListTitle from "../../../Component/Movie/ListTitle";
import MovieList from "../../../Component/Movie/MovieList";
import { movieListAttachLikeCount, movieListAttachLikeStatus } from "../../../common/functions/changeList";


const PopularMovie = ({totalPages, totalResults, list, genres, tabValue}) => {
    
    const router = useRouter();
    const [movieList, setMovieList] = useState([]);
    const [nowPage, setNowPage ] = useState(Number.parseInt(router.query.nowPage) || 1);

    useEffect(()=>{
        (async () => {
            await movieListRender(list);
        })();
        return () => {};
    },[list])

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
        const {data:{results}} = await movieGetPopularList(value);
        await movieListRender(results);
    }

    
    return (
        <>
            <ListTitle title={`POPULAR MOVIE`} />
            <MovieSort
            nowPage={nowPage}
            changeMovieListBySortingAndOrderBy={excuteSort} />
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

export default PopularMovie;
