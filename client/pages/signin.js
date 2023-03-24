import React, {useState} from 'react'
import Input from '../Component/Form/Input'
import Button from '../Component/Common/Button'
import { userLogin } from '../api/user';
import Cookies from 'js-cookie';
import { signIn } from 'next-auth/react';
import WithAuth from '../Hoc/withAuth';

 function login() {
  
  const [userid, setUserid] = useState("");
  const [userpw, setUserpw] = useState("");
    
  const onSubmitHandler = (e) => {
    e.preventDefault();
    // let form = {
    //   userid, userpw
    // }

    // console.log(form);

    // userLogin(form).then(res=>{
    //     const {accessToken, refreshToken} = res.data;
    //     Cookies.set('access_token', accessToken);
    //     Cookies.set('refresh_token', refreshToken);
    //     alert('login success');
    // });
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
    // signIn('googleCustomProvider')
  }
  return (
    <>
      <div>login</div>
      <form onSubmit={onSubmitHandler}>
          <Input name="userid" type="text" placeholder="" title={`userid`} onChange={onChangeInputHandler} value={userid}/>
          <Input name="userpw" type="password" placeholder="" title={`userpw`} onChange={onChangeInputHandler} value={userpw}/>
          <Button type="submit" title="submit" />
      </form>
      <Button type="button" title="signin with google" onClick={signinWithGoogle}/>
      {/* <a href='http://localhost:4001/oauth2/authorization/google'>sign with google</a> */}
    </>
  )
}

export default WithAuth(login);