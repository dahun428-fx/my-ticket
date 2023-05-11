import { Box, Chip, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { searchMovieListByKeywordId } from "../../../api/movie";
import Movie from "../../../models/movie";
import MovieCard from "../../../Component/Movie/Card";
import { useRouter } from "next/router";
import MovieCardSimilar from "../../../Component/Movie/CardSimilar";

const SearchMovieByKeyword = ({searchKeywordsList, nowPage, genres}) => {
    
    const router = useRouter();

    const [searchKeywords, setSearchKeywords] = useState([]);
    const [movieList, setMovieList] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [totalResults, setTotalResults] = useState(0);

    useEffect(()=>{
        setSearchKeywords(searchKeywordsList);
    },[searchKeywordsList]);
    
    useEffect(()=>{
        setMovieList([]);
        setTotalPages(0);
        setTotalResults(0);
    },[router.asPath])

    const keywordClickHandler = async (e, keywordid) => {
        // console.log(keywordid);
        e.preventDefault();
        const {data} = await searchMovieListByKeywordId(keywordid);
        console.log('keyword searched movie lst ,' , data);
        const {results, total_pages, total_results} = data;
        setMovieList(results);
        setTotalPages(total_pages);
        setTotalResults(total_results);
    }

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
                
                </Paper>
            </Box>
            { movieList.length > 0 &&
            <Box mt={2} mb={2} padding={2}>
                <Typography variant="h6" mt={1}>
                키워드 검색 결과
                </Typography>
                <Divider/>
                <Stack padding={2}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
                        sx={{
                            flexWrap:'nowrap',
                            overflowX:'auto',
                            margin: 0,
                            padding: 2,
                            listStyle: "none",
                            height: "100%",
                            '&::-webkit-scrollbar': {
                                width: '0.4em'
                            },
                            '&::-webkit-scrollbar-track': {
                                boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                                webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                                background: 'rgba(33, 122, 244, .1)'
                            },
                            '&::-webkit-scrollbar-thumb': {
                                height: '30%', /* 스크롤바의 길이 */
                                background: '#217af4', /* 스크롤바의 색상 */
                                borderRadius: '10px'
                            }
                    }}
                    >
                        {
                            movieList.length > 0 &&
                            movieList.map((item, index) => {
                            
                                return (
                                <Grid key={index} item>
                                    <MovieCardSimilar movie={item}/>
                                </Grid>
                                );
                            })
                        }
                    </Grid>
                </Stack>
                
            </Box> 
            }
            </>
        }
        </>
    )
}
export default SearchMovieByKeyword;