import React, {useEffect, useState} from 'react'
import { userSignUp } from '../api/user';
import { useRouter } from 'next/router';
import { Box, Paper, Button, Stack, TextField, Typography } from '@mui/material';
import * as yup from 'yup';
import {Form, useFormik} from 'formik';
import { PASSWORD_ENUM, USER_ID_ENUM, USER_NAME_ENUM } from '../common/validation/sign/enum/user_enum';

export default function signup() {

    const router = useRouter();

    const [userid, setUserid] = useState("");
    const [userpw, setUserpw] = useState("");
    const [username, setUsername] = useState("");
    const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
    const [isDuplicateUser, setIsDuplicateUser ] = useState(false);

    const scheme = yup.object().shape({
        userid : yup.string().required(USER_ID_ENUM.REQUIRE),
        password : yup.string().required(PASSWORD_ENUM.REQUIRE),
        username : yup.string().required(USER_NAME_ENUM.REQUIRE),
    })

    useEffect(()=>{
        return ()=> setIsSignUpSuccess(false);
    },[])

    const formik = useFormik({
        initialValues : {
            userid : '',
            password : '',
            username : '',
        },
        validationSchema : scheme,
        onSubmit : async values => {
            let form = {
                userid : values.userid,
                userpw : values.password,
                username : values.username
            }
            setIsSignUpSuccess(true);
            await userSignUp(form).then(res => {
                if(res.status === 200) {
                    alert('회원가입이 완료되었습니다.');
                    router.push('/signin');
                } 
            }).catch(err => {
                if (err.status === 409) {
                    setIsSignUpSuccess(false);
                    setIsDuplicateUser(true);
                }
            });
        }
    })

    const onFocusHandler = (e) => {
        setIsDuplicateUser(false);
    }

    const onChangeInputHandler = (e) => {
        let name = e.target.name;
        let val = e.target.value;

        if(name === 'userid'){
            setUserid(val);
        } else if (name === 'userpw') {
            setUserpw(val);
        } else if (name === 'username') {
            setUsername(val);
        }
    }

    return (
        <>
            <Stack alignItems={`center`}>
                <Paper
                    variant='outlined'
                    sx={{
                        padding:5,
                        margin:10,
                        width:'80%', maxWidth:'600px',
                        minWidth:'300px'
                      }}
                >
                    <Typography
                        variant='h6'
                    >SIGN UP</Typography>
                    <Box component={`form`}
                        sx={{
                        '& .MuiTextField-root': { m: 1, minWidth: '25ch'},
                        }}
                        autoComplete="off"
                        onSubmit={formik.handleSubmit}
                        >
                        <div>
                            <TextField
                                fullWidth 
                                id='userid'
                                label='userid'
                                name='userid'
                                type='text'
                                placeholder='아이디를 입력해주세요'
                                value={userid}
                                onChange={onChangeInputHandler}
                                onFocus={onFocusHandler}
                                {...formik.getFieldProps('userid')}
                            />
                            <Typography variant='overline' color={'red'}>
                            {formik.errors.userid}
                            </Typography>
                            {
                                isDuplicateUser &&
                                <Typography variant='overline' color={`red`}>
                                    다른 아이디를 입력해주세요.
                                </Typography>
                            }
                        </div>
                        <div>
                            <TextField 
                                fullWidth
                                id='userpw'
                                label='password'
                                type='password'
                                name='userpw'
                                value={userpw}
                                onChange={onChangeInputHandler}
                                onFocus={onFocusHandler}
                                {...formik.getFieldProps('password')}
                            />
                            <Typography variant='overline' color={'red'}>
                            {formik.errors.password}
                            </Typography>
                            
                        </div>
                        <div>
                            <TextField 
                                fullWidth
                                id='username'
                                label='username'
                                type='text'
                                name='username'
                                value={username}
                                onChange={onChangeInputHandler}
                                onFocus={onFocusHandler}
                                {...formik.getFieldProps('username')}
                            />
                            <Typography variant='overline' color={'red'}>
                            {formik.errors.username}
                            </Typography>
                        </div>
                        
                        <Box component="div" display="flex" justifyContent="center">
                            <Button variant='contained' type='submit'
                                disabled={isSignUpSuccess}
                                fullWidth
                                sx={{
                                marginTop:'8px',
                                marginRight:'-1px',
                                marginLeft:'-1px',
                                position:'relative',
                                left:'7px'
                                }}
                            >SIGNUP</Button>
                        </Box>
                    </Box>
                </Paper>
            </Stack>
        </>
    )
//     return (
//     <>
//         <div>signup</div>
//         <form onSubmit={onSubmitHandler}>
//             <Input name="userid" type="text" placeholder="" title={`userid`} onChange={onChangeInputHandler} value={userid}/>
//             <Input name="userpw" type="password" placeholder="" title={`userpw`} onChange={onChangeInputHandler} value={userpw}/>
//             <Input name="username" type="text" placeholder="" title={`username`} onChange={onChangeInputHandler} value={username}/>
//             <Button type="submit" title="submit"/>
//         </form>

//     </>
//   )
}
