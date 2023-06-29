import { Paper, Stack } from "@mui/material"
import SignUpForm from "../../../common/Component/Form/signup"

const SignInPage = () => {

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
                    <SignUpForm />
                </Paper>
            </Stack>
        </>
    )
}

export default SignInPage;