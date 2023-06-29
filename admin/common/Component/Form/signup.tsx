import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import * as yup from 'yup';
import { DEPARTMENT_ENUM, EMAIL_ENUM, PASSWORD_ENUM, USER_ID_ENUM, USER_NAME_ENUM } from "../../Enum/form.user";
import { useFormik } from "formik";


interface Values {
    userId : string,
    pwd : string,
    pwdChk : string,
    name : string,
    department : string,
    email : string,
}

const SignUpForm = () => {

    const scheme = yup.object().shape({
        userId : yup.string().required(USER_ID_ENUM.REQUIRE),
        pwd : yup.string().required(PASSWORD_ENUM.REQUIRE),
        pwdChk : yup.string().required(PASSWORD_ENUM.REQUIRE),
        name : yup.string().required(USER_NAME_ENUM.REQUIRE),
        department : yup.string().required(DEPARTMENT_ENUM.REQUIRE),
        email : yup.string().required(EMAIL_ENUM.REQUIRE),
    })

    const formik = useFormik<Values>({
        initialValues : {
            userId : '',
            pwd : '',
            pwdChk : '',
            name : '',
            department : '',
            email : '',
        },
        validationSchema: scheme,
        onSubmit : async values => {
            console.log(values);
        }
    })


    return (
        <>
            <Typography variant="h6">SIGN UP</Typography>
            <Box component={`form`}
                sx={{
                    '& .MuiTextField-root': { m: 1, minWidth: '25ch'},
                    }}
                autoComplete="off"
                onSubmit={formik.handleSubmit}
            >
                <Box component={'div'}>
                    <TextField 
                        fullWidth
                        id="userId"
                        label="userId"
                        type="text"
                        {...formik.getFieldProps('userId')}
                    />
                    <Typography
                        variant="overline"
                        color={'red'}
                    >
                        {formik.errors.userId}
                    </Typography>
                </Box>
                <Box component={'div'}>
                    <TextField 
                        fullWidth
                        id="pwd"
                        label="password"
                        type="password"
                        {...formik.getFieldProps('pwd')}
                    />
                    <Typography
                        variant="overline"
                        color={'red'}
                    >
                        {formik.errors.pwd}
                    </Typography>
                </Box>
                <Box component={'div'}>
                    <TextField 
                        fullWidth
                        id="pwdChk"
                        label="password"
                        type="password"
                        {...formik.getFieldProps('pwdChk')}
                    />
                    <Typography
                        variant="overline"
                        color={'red'}
                    >
                        {formik.errors.pwdChk}
                    </Typography>
                </Box>
                <Box component={'div'}>
                    <TextField 
                        fullWidth
                        id="name"
                        label="name"
                        type="text"
                        {...formik.getFieldProps('name')}
                    />
                    <Typography
                        variant="overline"
                        color={'red'}
                    >
                        {formik.errors.name}
                    </Typography>
                </Box>
                <Box component={'div'}>
                    <TextField 
                        fullWidth
                        id="email"
                        label="email"
                        type="email"
                        {...formik.getFieldProps('email')}
                    />
                    <Typography
                        variant="overline"
                        color={'red'}
                    >
                        {formik.errors.email}
                    </Typography>
                </Box>
                <Box component={'div'}
                    sx={{
                        position:'relative',
                        left:'6px'
                    }}
                >
                    <FormControl fullWidth
                    >
                        <InputLabel
                            id="dep-select-label"
                        >Department</InputLabel>
                        <Select
                            labelId="dep-select-label"
                            id="dep-select"
                            label="Department"
                            {...formik.getFieldProps('department')}
                        >
                            <MenuItem value={1}>IT기획</MenuItem>
                            <MenuItem value={2}>IT프론트</MenuItem>
                            <MenuItem value={3}>IT백엔드</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                >등록</Button>
            </Box>
        </>
    )
}
export default SignUpForm;