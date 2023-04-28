import React, {useEffect, useState} from 'react'
import Input from '../Component/Form/Input'
import Btn from '../Component/Common/Button'
import { userLogin } from '../api/user';
import Cookies from 'js-cookie';
import { signIn } from 'next-auth/react';
import WithAuth from '../Hoc/withAuth';
import getAllowProvider from '../configs/provider/config.oAuth2.provider.controll';
import { FACEBOOK_PROVIDER, GITHUB_PROVIDER, GOOGLE_PROVIDER, KAKAO_PROVIDER, NAVER_PROVIDER } from '../configs/provider/config.oAuth2.provider.enum';
import setError from '../middleware/axiosErrorInstance';
import { Box, Button, Grid, Paper, Stack, TextField, Typography } from '@mui/material';

 function login() {
  
  const [userid, setUserid] = useState("");
  const [userpw, setUserpw] = useState("");
    
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await signIn('credentials', {
          id:userid, password:userpw,
          redirect: false,
          callbackUrl:'/'
        }).then((data) => {
          if(data?.error){
            setError({response:{data:{message:data.error}, status:data.status}});
          }
        })
    return () =>{};
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
          margin:10
        }}
      >
      <Typography
        variant='h6'
      >LOGIN</Typography>
      <Box component="form"
         sx={{
          '& .MuiTextField-root': { m: 1, minWidth: '25ch' },
        }}
        autoComplete="off"
        onSubmit={onSubmitHandler}
      >
        <div>
          <TextField
            fullWidth
            id="userid"
            label="userid"
            type='text'
            name='userid'
            onChange={onChangeInputHandler}
            value={userid}
          />
        </div>
        <div>
          <TextField
            fullWidth
            id="userpw"
            label="password"
            type='password'
            name='userpw'
            onChange={onChangeInputHandler}
            value={userpw}
          />
        </div>
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