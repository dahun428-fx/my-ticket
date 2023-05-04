import { Box, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, SpeedDial, SpeedDialIcon } from "@mui/material";
import { ORDER_BY_ASC, ORDER_BY_DESC, SORT_LIKE, SORT_POPULARITY, SORT_RELEASE_DATE, SORT_VOTE_AVERAGE, toMessageOrderBy, toMessageSort } from "../../common/enum/sort";
import { useEffect, useState } from "react";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const MovieSort = ({changeMovieListBySortingAndOrderBy, nowPage}) => {

    const [sortValue, setSortValue] = useState(SORT_POPULARITY);
    const [orderbyValue, setOrderbyValue] = useState(ORDER_BY_DESC);

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

    return (
        <Box component="div" sx={{alignItems:'end'}}>
            <Grid container>
                <Grid item>
                    <FormControl>
                        <InputLabel>리스트 검색</InputLabel>

                    </FormControl>

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
        </Box>
    )
}

export default MovieSort;