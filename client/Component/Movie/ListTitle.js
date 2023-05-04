import { Paper, Typography } from "@mui/material";

const ListTitle = ({title}) => {

    return (
        <Paper variant="outlined" sx={{padding:3}}>
            <Typography variant="h5" component="div" textAlign='center'>
                {title}
            </Typography>
        </Paper>
    )
}
export default ListTitle;