import React, {useState} from 'react'
import Input from '../Component/Form/Input'
import Button from '../Component/Common/Button'
import { userLogin } from '../api/user';
import Cookies from 'js-cookie';

export default function login() {
  
  const [userid, setUserid] = useState("");
  const [userpw, setUserpw] = useState("");
    
  const onSubmitHandler = (e) => {
    e.preventDefault();
    let form = {
      userid, userpw
    }

    console.log(form);

    userLogin(form).then(res=>{
        console.log('userLogin res : ', res);
        const {accessToken, refreshToken} = res.data;
        Cookies.set('access_token', accessToken);
        Cookies.set('refresh_token', refreshToken);
        // localStorage.setItem('access_token', accessToken);
        // localStorage.setItem('refresh_token', refreshToken);
        alert('login success');
    }).catch(err => {
      console.log('userLogin err : ', err);
      const {message} = err.response.data;
      alert(message);
    });
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
  return (
    <>
      <div>login</div>
      <form onSubmit={onSubmitHandler}>
          <Input name="userid" type="text" placeholder="" title={`userid`} onChange={onChangeInputHandler} value={userid}/>
          <Input name="userpw" type="password" placeholder="" title={`userpw`} onChange={onChangeInputHandler} value={userpw}/>
          <Button type="submit" title="submit" />
      </form>
    </>
  )
}
