import { IconButton, Input, InputBase, Paper } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import { useRouter } from "next/router";

const SearchBox = (props) => {
 
    return (
        <Paper
            component="form"
            sx={props.sx}
            elevation={0}
            onSubmit={(e) => props.onSubmitHandler(e)}
        >
            <Input
                sx={{ ml: 1, flex: 1 }}
                id="search-box"
                placeholder="search"
                value={props.searchKeyword}
                onChange={(e)=>props.onChangeHandler(e)}
                autoComplete="false"
            />
            <IconButton type="button" sx={{ p: '10px' }} onClick={(e) => props.onSubmitHandler(e)} id="search-btn" >
                <SearchIcon id="search-btn-icon" />
            </IconButton>
        </Paper>
    )
}

export default SearchBox;