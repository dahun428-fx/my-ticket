import { Box, Divider, Grid, Pagination, Stack, Typography } from "@mui/material";
import MovieCard from "./Card";

const MovieList = ({totalResults, movieList, totalPages, nowPage, pageChangeHandler, tabValue, genres}) => {
    return (
        <>
        {
            movieList.length > 0 &&
            <Box>
                <Typography variant="overline">총 {totalResults} 건</Typography>
                <Divider />
                <Box mt={2}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {   
                            movieList && 
                            movieList.map((item, index) => {
                                
                                return (
                                <Grid xs={4} sm={4} md={3} key={index} item>
                                    <MovieCard movie={item} nowPage={nowPage} tabValue={tabValue} genres={genres}/>
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
                </Box>
            </Box>
        }
        </>
    )
}

export default MovieList;