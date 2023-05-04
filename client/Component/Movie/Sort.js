import { Box, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Paper, Select, SpeedDial, SpeedDialIcon, TextField } from "@mui/material";
import { ORDER_BY_ASC, ORDER_BY_DESC, SORT_LIKE, SORT_POPULARITY, SORT_RELEASE_DATE, SORT_VOTE_AVERAGE, toMessageOrderBy, toMessageSort } from "../../common/functions/sort";
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from "next/router";

const MovieSort = ({changeMovieListBySortingAndOrderBy, nowPage}) => {

    const router = useRouter();
    const [sortValue, setSortValue] = useState(SORT_POPULARITY);
    const [orderbyValue, setOrderbyValue] = useState(ORDER_BY_DESC);
    const [searchKeyword, setSearchKeyword] = useState("");

    useEffect(()=>{
        changeMovieListBySortingAndOrderBy(sortValue, orderbyValue);
    },[nowPage]);

    const orderbyChangeHandler = (e) => {
        let {value} = e.target;
        setOrderbyValue(value);
        changeMovieListBySortingAndOrderBy(sortValue, value);
    }
    
    const sortChangeHandler = (e) => {
        let { value } = e.target;
        setSortValue(value);
        changeMovieListBySortingAndOrderBy(value, orderbyValue);
    }

    const movieSearchSubmitHanlder = (e) => {
        e.preventDefault();
        if(!searchKeyword || searchKeyword.length < 1) {
            return;
        } 
        router.push({
            pathname :'/product/search',
            query : {
              keyword: encodeURIComponent(searchKeyword)
            },
          }
        );
    }
    const movieSearchChangeHandler = (e) => {
        let { value } = e.target;
        console.log(value);
        if(value.length > 20) {
            return;
        }
        setSearchKeyword(value);
    }

    return (
        <Paper variant="outlined" sx={{mt:2, mb:2}}>
            <Grid container justifyContent='flex-end'>
                <Grid item>
                    <Box component="form" onSubmit={movieSearchSubmitHanlder}>
                    <FormControl sx={{m:1}}>
                        <TextField size="small" label="MOVIE SEARCH"
                            onChange={movieSearchChangeHandler}
                            value={searchKeyword}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </FormControl>
                    </Box>
                </Grid>
                <Grid item>
                    <FormControl size="small" sx={{m:1}}>
                        <InputLabel id="orderby-select-label">차순</InputLabel>
                        <Select
                            labelId="orderby-select-label"
                            label="차순"
                            value={orderbyValue}
                            onChange={orderbyChangeHandler}
                        >
                            <MenuItem value={ORDER_BY_DESC}>{toMessageOrderBy(ORDER_BY_DESC)}</MenuItem>
                            <MenuItem value={ORDER_BY_ASC}>{toMessageOrderBy(ORDER_BY_ASC)}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl size="small" sx={{m:1}}>
                        <InputLabel id="sort-select-label">정렬</InputLabel>
                        <Select
                            labelId="sort-select-label"
                            value={sortValue}
                            label="정렬"
                            onChange={sortChangeHandler}
                        >
                            <MenuItem value={SORT_POPULARITY}>{toMessageSort(SORT_POPULARITY)}</MenuItem>
                            <MenuItem value={SORT_RELEASE_DATE}>{toMessageSort(SORT_RELEASE_DATE)}</MenuItem>
                            <MenuItem value={SORT_LIKE}>{toMessageSort(SORT_LIKE)}</MenuItem>
                            <MenuItem value={SORT_VOTE_AVERAGE}>{toMessageSort(SORT_VOTE_AVERAGE)}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
               
            </Grid>
        </Paper>
    )
}

export default MovieSort;