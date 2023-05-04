import { IconButton, Paper } from "@mui/material";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const StaticPagenation = ({nowPage, totalPages, pageChangeHandler}) => {
    
    if(totalPages < 2) {
        return (<></>)
    }

    return (
        <>
            <Paper variant="outlined" sx={{position:'fixed', left:'0px', display: {xs:'block', sm:'block', md:'none'}}}>
                <IconButton color="primary"
                    disabled={nowPage === 1}
                    onClick={(e)=>pageChangeHandler(e, nowPage-1)}
                >
                    <KeyboardArrowLeftIcon/>
                </IconButton>
            </Paper>
            <Paper variant="outlined" sx={{position:'fixed', right:'0px',  display: {xs:'block', sm:'block', md:'none'}}}>
                <IconButton color="primary"
                    disabled={nowPage === totalPages}
                    onClick={(e)=>pageChangeHandler(e, nowPage+1)}
                >
                    <KeyboardArrowRightIcon/>
                </IconButton>
            </Paper>
        </>
    )
}

export default StaticPagenation;