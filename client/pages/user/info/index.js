import { Box, Button, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { changeUserPwd, isRightPassword } from "../../../api/user";
import PasswordChange from "./passwordChange";
// import axios from AxiosInterceptor;
// import { AxiosInterceptor as axios } from "../../../middleware/axiosInterceptorHook";

const UserInfoPage = (props) => {

    const [user, setUser] = useState(null);
    const [providerList, setProviderList] = useState([]);

    useEffect(()=>{

        setUser(props.user);
        setProviderList(props.providerList);

        return ()=>{setUser(null)}
    },[props.user, props.providerList])

    return (
        <>
            <Paper sx={{padding:2}}>
            {user && 
            <>
                <Box sx={{display:'flex'}}>
                    <AccountCircleIcon sx={{
                        marginTop:1
                    }} />
                    <Typography variant="h5"
                        sx={{
                            marginLeft:2,
                            marginTop:1,
                            verticalAlign:'middle'
                        }}
                    >Me</Typography>
                </Box>
                <Box m={2}>
                    <Typography variant="subtitle2">{user.id}</Typography>
                </Box>
                <Box m={2}>
                    <Typography variant="subtitle2">{user.name}</Typography>
                </Box>
                {
                    providerList.find(ele => ele.type === 0) && 
                    <>
                        <PasswordChange user={user}/>
                    </>
                }
            </>
            }
            </Paper>
        </>
    )
}

export default UserInfoPage;