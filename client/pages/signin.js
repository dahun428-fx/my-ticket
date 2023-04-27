import React, {useState} from 'react'
import Input from '../Component/Form/Input'
import Btn from '../Component/Common/Button'
import { userLogin } from '../api/user';
import Cookies from 'js-cookie';
import { signIn } from 'next-auth/react';
import WithAuth from '../Hoc/withAuth';
import getAllowProvider from '../configs/provider/config.oAuth2.provider.controll';
import { FACEBOOK_PROVIDER, GITHUB_PROVIDER, GOOGLE_PROVIDER, KAKAO_PROVIDER, NAVER_PROVIDER } from '../configs/provider/config.oAuth2.provider.enum';
import setError from '../middleware/axiosErrorInstance';
import { Box, Button, Stack, TextField } from '@mui/material';

 function login() {
  
  const [userid, setUserid] = useState("");
  const [userpw, setUserpw] = useState("");
    
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await signIn('credentials', {
          id:userid, password:userpw,
          redirect: false,
          callbackUrl:'/test/loginSuccess'
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
  const signinWithProvider = (e) => {
    let provider = e.target.name;
    signIn(provider);
  }
  
  return (
    <>
      <div>login</div>
      <Stack alignItems="center">

      <Box component="form"
         sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        autoComplete="off"
      >
        <div>
          <TextField
            id="userid"
            label="userid"
            type='text'
          />
        </div>
        <div>
          <TextField
            id="userpw"
            label="password"
            type='password'
          />
        </div>
        <Box component="div" alignItems="center">
          <Button variant='outlined' type='submit'>LOGIN</Button>
        </Box>
      </Box>
      </Stack>


      <form onSubmit={onSubmitHandler}>
          <Input name="userid" type="text" placeholder="" title={`userid`} onChange={onChangeInputHandler} value={userid}/>
          <Input name="userpw" type="password" placeholder="" title={`userpw`} onChange={onChangeInputHandler} value={userpw}/>
          <Btn type="submit" title="submit" />
      </form>
      {getAllowProvider(GOOGLE_PROVIDER) && 
        <div>
        <Btn type="Btn" name={GOOGLE_PROVIDER} title="signin with google" onClick={(e) => signinWithProvider(e)}/>
        </div>
      }
      {
        getAllowProvider(GITHUB_PROVIDER) &&
      <div>
      <Btn type="Btn" name={GITHUB_PROVIDER} title="signin with github" onClick={(e) => signinWithProvider(e)}/>
      </div>
      }
      {
        getAllowProvider(FACEBOOK_PROVIDER) &&
      <div>
      <Btn type="Btn" name={FACEBOOK_PROVIDER} title="signin with FB" onClick={(e) => signinWithProvider(e)}/>
      </div>
      }
      {
        getAllowProvider(KAKAO_PROVIDER) &&
      <div>
      <Btn type="Btn" name={KAKAO_PROVIDER} title="signin with Kakao" onClick={(e) => signinWithProvider(e)}/>
      </div>
      }
      {
        getAllowProvider(NAVER_PROVIDER) &&
      <div>
      <Btn type="Btn" name={NAVER_PROVIDER} title="signin with Naver" onClick={(e) => signinWithProvider(e)}/>
      </div>
      }
      {/* <a href='http://localhost:4001/oauth2/authorization/google'>sign with google</a> */}
    </>
  )
}

export default login;