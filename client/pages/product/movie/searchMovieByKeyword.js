import { Box, Chip, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { searchMovieListByKeywordId } from "../../../api/movie";
import Movie from "../../../models/movie";
import MovieCard from "../../../Component/Movie/Card";
import { useRouter } from "next/router";
import MovieCardSimilar from "../../../Component/Movie/CardSimilar";
import KeywordSeachDetail from "../search/detail/[keywordid]";

const SearchMovieByKeyword = ({searchKeywordsList, nowPage, genres}) => {
    
    const router = useRouter();

    const [searchKeywords, setSearchKeywords] = useState([]);
    const [movieList, setMovieList] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    const [keywordid, setKeywordid] = useState("");

    useEffect(()=>{
        setSearchKeywords(searchKeywordsList);
    },[searchKeywordsList]);
    
    useEffect(()=>{
        setMovieList([]);
        setTotalPages(0);
        setTotalResults(0);
        setKeywordid("");
    },[router.asPath])

    const keywordClickHandler = (e, keywordid) => {
        e.preventDefault();
        console.log('keywordid :', keywordid);
        setKeywordid(keywordid);
    }
    // const keywordClickHandler = async (e, keywordid) => {
    //     // console.log(keywordid);
    //     e.preventDefault();
    //     const {data} = await searchMovieListByKeywordId(keywordid);
    //     console.log('keyword searched movie lst ,' , data);
    //     const {results, total_pages, total_results} = data;
    //     setMovieList(results);
    //     setTotalPages(total_pages);
    //     setTotalResults(total_results);
    // }

    return (
        <>
        {
            searchKeywords.length > 0 &&
            <>
            <Box mb={2}>
                <Paper variant="outlined"
                    sx={{
                        padding:2
                    }}
                >
                <Typography variant="subtitle2"
                    sx={{
                        fontWeight:'bold'
                    }}
                >키워드 검색</Typography>
                <Divider/>
                <Grid container spacing={1} mt={1}>
                    {
                        searchKeywords.length > 0 &&
                        searchKeywords.map((item, index) => {
                            return (
                            <Grid item key={item.id}>
                                <Chip size="small" label={item.name} color="secondary" variant="outlined"
                                    onClick={(e)=>keywordClickHandler(e, item.id)}
                                />
                            </Grid>
                            )
                        })
                    }
                </Grid>
                <KeywordSeachDetail keywordid={keywordid} />
                </Paper>
            </Box>
            
            </>
        }
        </>
    )
}
export default SearchMovieByKeyword;