import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import MovieCardSimilar from "../../../../Component/Movie/CardSimilar";
import { searchMovieListByKeywordId } from "../../../../api/movie";

const KeywordSeachDetail = ({keywordid}) => {

    const [movieList, setMovieList] = useState([]);
    const [id, setId] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    useEffect(()=>{
        (async () => {
            console.log(keywordid);
            setId(keywordid);
            if(keywordid) {
                const {data} = await searchMovieListByKeywordId(keywordid);
                const {results, total_pages, total_results} = data;
                setMovieList(results);
                setTotalPages(total_pages);
                setTotalResults(total_results);
            } else {
                setMovieList([]);
                setTotalPages(0);
                setTotalResults(0);
            }
        })();
        return () => setMovieList([]);
    },[keywordid])

    return (
        <>
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
    )
}

export default KeywordSeachDetail;