import React, {useState} from 'react'
import Input from '../Component/Form/Input'
import Button from '../Component/Common/Button'

export default function signup() {

    const [userid, setUserid] = useState("");
    const [userpw, setUserpw] = useState("");
    const [username, setUsername] = useState("");

    const onSubmitHandler = (e) => {
        e.preventDefault();
        let form = {
            userid, userpw, username
        }
        console.log(form);
    }

    const onChangeInputHandler = (e) => {
        console.log(e.target.name);
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
        <div>signup</div>
        <form onSubmit={onSubmitHandler}>
            <Input name="userid" type="text" placeholder="" title={`userid`} onChange={onChangeInputHandler} value={userid}/>
            <Input name="userpw" type="password" placeholder="" title={`userpw`} onChange={onChangeInputHandler} value={userpw}/>
            <Input name="username" type="text" placeholder="" title={`username`} onChange={onChangeInputHandler} value={username}/>
            <Button type="submit" title="submit"/>
        </form>

    </>
  )
}
