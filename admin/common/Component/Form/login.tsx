import * as yup from 'yup';
import {ErrorMessage, Form, FormikConfig, FormikValues, useFormik} from 'formik';
import { useState } from 'react';
import { PASSWORD_ENUM, USER_ID_ENUM } from '../../Enum/form.user';
import { Stack, Paper, Typography, Box, TextField, Button } from '@mui/material';

interface Values {
    userId : string,
    pwd : string,
}

const LoginForm = () => {

    const scheme = yup.object().shape({
        userId : yup.string().required(USER_ID_ENUM.REQUIRE),
        pwd : yup.string().required(PASSWORD_ENUM.REQUIRE),
    })

    const formik = useFormik<Values>({
        initialValues:{
            userId:'',
            pwd:'',
        },
        validationSchema: scheme,
        onSubmit : async values => {
            console.log('values', values);
            if(values.userId !== 'aaa') {
                formik.setErrors({userId:'존재하지 않은 회원입니다.'});
            }
        },
    })

    
    const onFocusInput = (event : React.FocusEvent<HTMLInputElement>) => {
        formik.setErrors({});
    }
    
    return (
        <>
            <Typography
                variant='h6'
            >
                LOGIN
            </Typography>
            <Box 
                component='form'
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
                        type='text'
                        onFocus={onFocusInput}
                        {...formik.getFieldProps('userId')}
                    />
                    <Typography
                        variant='overline'
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
                        type='password'
                        onFocus={onFocusInput}
                        {...formik.getFieldProps('pwd')}
                    />
                    <Typography
                        variant='overline'
                        color={'red'}
                    >
                        {formik.errors.pwd}
                    </Typography>
                </Box>
                <Box component="div" display="flex" justifyContent="center">
                <Button variant='contained' type='submit'
                    fullWidth
                    sx={{
                    marginTop:'8px',
                    marginRight:'-1px',
                    marginLeft:'-1px',
                    position:'relative',
                    left:'7px'
                    }}
                >LOGIN</Button>
                </Box>
            </Box>
        </>
    )
}

export default LoginForm;