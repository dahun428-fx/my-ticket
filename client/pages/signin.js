import React, {useState} from 'react'
import Input from '../Component/Form/Input'
import Button from '../Component/Common/Button'
import { userLogin } from '../api/user';
import Cookies from 'js-cookie';
import { signIn } from 'next-auth/react';
import WithAuth from '../Hoc/withAuth';
import getAllowProvider from '../configs/provider/config.oAuth2.provider.controll';
import { FACEBOOK_PROVIDER, GITHUB_PROVIDER, GOOGLE_PROVIDER } from '../configs/provider/config.oAuth2.provider.enum';

 function login() {
  
  const [userid, setUserid] = useState("");
  const [userpw, setUserpw] = useState("");
    
  const onSubmitHandler = (e) => {
    e.preventDefault();

    signIn('credentials', {
      id:userid, password:userpw, redirect: true, 
      callbackUrl:'/test/loginSuccess'
    })
    return () =>{};
  }

  const onChangeInputHandler = (e) => {
    console.log(e.target.name);
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
      <form onSubmit={onSubmitHandler}>
          <Input name="userid" type="text" placeholder="" title={`userid`} onChange={onChangeInputHandler} value={userid}/>
          <Input name="userpw" type="password" placeholder="" title={`userpw`} onChange={onChangeInputHandler} value={userpw}/>
          <Button type="submit" title="submit" />
      </form>
      {getAllowProvider(GOOGLE_PROVIDER) && 
        <div>
        <Button type="button" name={GOOGLE_PROVIDER} title="signin with google" onClick={(e) => signinWithProvider(e)}/>
        </div>
      }
      {
        getAllowProvider(GITHUB_PROVIDER) &&
      <div>
      <Button type="button" name={GITHUB_PROVIDER} title="signin with github" onClick={(e) => signinWithProvider(e)}/>
      </div>
      }
      {
        getAllowProvider(FACEBOOK_PROVIDER) &&
      <div>
      <Button type="button" name={FACEBOOK_PROVIDER} title="signin with FB" onClick={(e) => signinWithProvider(e)}/>
      </div>
      }
      {/* <a href='http://localhost:4001/oauth2/authorization/google'>sign with google</a> */}
    </>
  )
}

export default WithAuth(login);