import React, {useEffect, useState} from 'react'
import { signIn } from 'next-auth/react';
import getAllowProvider from '../configs/provider/config.oAuth2.provider.controll';
import { FACEBOOK_PROVIDER, GITHUB_PROVIDER, GOOGLE_PROVIDER, KAKAO_PROVIDER, NAVER_PROVIDER } from '../configs/provider/config.oAuth2.provider.enum';
import setError from '../middleware/axiosErrorInstance';
import { Box, Button, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import * as yup from 'yup';
import {Form, useFormik} from 'formik';
import { PASSWORD_ENUM, USER_ID_ENUM } from '../common/validation/sign/enum/user_enum';


 function login() {
  
  const [userid, setUserid] = useState("");
  const [userpw, setUserpw] = useState("");
  const [noUser, setNoUser] = useState(false);  

  const scheme = yup.object().shape({
    userid : yup.string().required(USER_ID_ENUM.REQUIRE),
    password : yup.string().required(PASSWORD_ENUM.REQUIRE),
  })

  const formik = useFormik({
    initialValues : {
      userid : '',
      password : '',
    },
    validationSchema : scheme,
    onSubmit : async values => {
      await signIn('credentials', {
        id:values.userid, password:values.password,
        redirect: false,
        callbackUrl:'/'
      })
      .then((data) => {
        if(data?.error){
          if(data?.status === 401){
            setNoUser(true);
          }
          setError({response:{data:{message:data.error}, status:data.status}});
        }
      })
    },
  })

  const onFocusHandler = (e) => {
    setNoUser(false);
  }

  const onChangeInputHandler = (e) => {
    let name = e.target.name;
    let val = e.target.value;

    if(name === 'userid'){
        setUserid(val);
    } else if (name === 'userpw') {
        setUserpw(val);
    } 
  }
  const signinWithProvider = async (provider) => {
    if(!provider){
      return;
    }
    await signIn(provider, {
      callbackUrl:'/'
    });
  }

  return (
    
    
    <>
      <Stack alignItems="center">
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
      >LOGIN</Typography>
      <Box component="form"
         sx={{
          '& .MuiTextField-root': { m: 1, minWidth: '25ch'},
        }}
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <div>
          <TextField
            fullWidth
            id="userid"
            label="userid"
            type='text'
            name='userid'
            onChange={onChangeInputHandler}
            onFocus={onFocusHandler}
            value={userid}
            {...formik.getFieldProps('userid')}
          />
          <Typography variant='overline' color={'red'}>
          {formik.errors.userid}
          </Typography>
        </div>
        <div>
          <TextField
            fullWidth
            id="userpw"
            label="password"
            type='password'
            name='userpw'
            onChange={onChangeInputHandler}
            onFocus={onFocusHandler}
            value={userpw}
            {...formik.getFieldProps('password')}
          />
          <Typography variant='overline' color={'red'}>
          {formik.errors.password}
          </Typography>
        </div>
        {
          noUser &&
        <Typography variant='overline' color={`red`}>
            존재하지 않은 회원입니다. <br></br>
            아이디, 비밀번호를 확인해주세요.
        </Typography>
        }
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
      <Stack
        sx={{
          marginTop:'8px',
          marginRight:'-1px',
          marginLeft:'-1px',
          position:'relative',
          left:'7px'
        }}
      >
        {
          getAllowProvider(GOOGLE_PROVIDER) && 

          <Paper variant='outlined'
            sx={{
              marginBottom:1
            }}
          >
            <Button
            style={{
              backgroundImage:'url("https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png")',
              backgroundRepeat:'no-repeat',
              backgroundSize:30,
              backgroundPosition:2
            }}
              fullWidth
              onClick={(e)=>signinWithProvider(GOOGLE_PROVIDER)}
              name={GOOGLE_PROVIDER}
            >
              <Typography 
                variant='subtitle2'
                sx={{marginLeft:1}}
                name={GOOGLE_PROVIDER}
                >
                SignIn With Google
              </Typography>
            </Button>
          </Paper>
        }
        {
          getAllowProvider(GITHUB_PROVIDER) &&
          <Paper variant='outlined'
            sx={{
              marginBottom:1
            }}
          >
            <Button
            style={{
              backgroundImage:'url("https://github.githubassets.com/favicons/favicon.png")',
              backgroundRepeat:'no-repeat',
              backgroundSize:30,
              backgroundPosition:2
            }}
              fullWidth
              onClick={(e) => signinWithProvider(GITHUB_PROVIDER)}
              name={GITHUB_PROVIDER}
            >
              
              <Typography 
                variant='subtitle2'
                sx={{marginLeft:1}}
                name={GITHUB_PROVIDER}
                >
                SignIn With Github
              </Typography>
            </Button>
          </Paper>
        }
        {
          getAllowProvider(FACEBOOK_PROVIDER) &&
          <Paper variant='outlined'
            sx={{
              marginBottom:1
            }}
          >
            <Button
            style={{
              backgroundImage:'url("https://static.xx.fbcdn.net/rsrc.php/yD/r/d4ZIVX-5C-b.ico")',
              backgroundRepeat:'no-repeat',
              backgroundSize:30,
              backgroundPosition:2
            }}
              fullWidth
              onClick={(e) => signinWithProvider(FACEBOOK_PROVIDER)}
              name={FACEBOOK_PROVIDER}
            >
              <Typography 
                variant='subtitle2'
                sx={{marginLeft:1}}
                name={FACEBOOK_PROVIDER}
                >
                SignIn With Facebook
              </Typography>
            </Button>
          </Paper>
        }
        {
          getAllowProvider(KAKAO_PROVIDER) &&
          <Paper variant='outlined'
            sx={{
              marginBottom:1
            }}
          >
            <Button
            style={{
              backgroundImage:'url("https://www.kakaocorp.com/page/favicon.ico")',
              backgroundRepeat:'no-repeat',
              backgroundSize:30,
              backgroundPosition:2
            }}
              fullWidth
              onClick={(e) => signinWithProvider(KAKAO_PROVIDER)}
              name={KAKAO_PROVIDER}
            >
              <Typography 
                variant='subtitle2'
                sx={{marginLeft:1}}
                name={KAKAO_PROVIDER}
                >
                SignIn With Kakao
              </Typography>
            </Button>
          </Paper>
        }
        {
          getAllowProvider(NAVER_PROVIDER) &&
          <Paper variant='outlined'
            sx={{
              marginBottom:1
            }}
          >
            <Button
            style={{
              backgroundImage:'url("https://www.naver.com/favicon.ico?1")',
              backgroundRepeat:'no-repeat',
              backgroundSize:30,
              backgroundPosition:2
            }}
              fullWidth
              onClick={(e) => signinWithProvider(NAVER_PROVIDER)}
              name={NAVER_PROVIDER}
            >
              <Typography 
                variant='subtitle2'
                sx={{marginLeft:1}}
                name={NAVER_PROVIDER}
                >
                SignIn With Naver
              </Typography>
            </Button>
          </Paper>
        }
      </Stack>
      </Paper>
      </Stack>

    </>
  )
}

export default login;