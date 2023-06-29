import { Paper, Stack } from "@mui/material";
import LoginForm from "../../../common/Component/Form/login";

const LoginPage = () => {
    return (
        <>
            <Stack alignItems='center'>
                <Paper
                    variant='outlined'
                    sx={{
                    padding:5,
                    margin:10,
                    width:'80%', maxWidth:'600px',
                    minWidth:'300px'
                    }}
                >
                    <LoginForm />
                </Paper>
            </Stack>
        </>
    )
}

export default LoginPage;