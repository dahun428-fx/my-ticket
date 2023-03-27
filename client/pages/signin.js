import React, {useState} from 'react'
import Input from '../Component/Form/Input'
import Button from '../Component/Common/Button'
import { userLogin } from '../api/user';
import Cookies from 'js-cookie';
import { signIn } from 'next-auth/react';
import WithAuth from '../Hoc/withAuth';
import getAllowProvider from '../configs/config.oAuth2.provider.controll';

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
  const signinWithGoogle = (e) => {
    console.log('signinWithGoogle');
    signIn('google')
  }
  const signinWithGithub = (e) => {
    console.log('signingithub');
    signIn('github');
  }
  
  return (
    <>
      <div>login</div>
      <form onSubmit={onSubmitHandler}>
          <Input name="userid" type="text" placeholder="" title={`userid`} onChange={onChangeInputHandler} value={userid}/>
          <Input name="userpw" type="password" placeholder="" title={`userpw`} onChange={onChangeInputHandler} value={userpw}/>
          <Button type="submit" title="submit" />
      </form>
      {getAllowProvider('google') && 
        <div>
        <Button type="button" title="signin with google" onClick={signinWithGoogle}/>
        </div>
      }
      {
        getAllowProvider('github') &&
      <div>
      <Button type="button" title="signin with github" onClick={signinWithGithub}/>
      </div>
      }
      {/* <a href='http://localhost:4001/oauth2/authorization/google'>sign with google</a> */}
    </>
  )
}

export default WithAuth(login);