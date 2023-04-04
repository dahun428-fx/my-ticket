import axios from 'axios';
import Button from '../../../../Component/Common/Button'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import GithubOAuthProvider from './GithubOAuthProvider';



export default function GithubLoginPage(props) {
    


    return (
        <GithubOAuthProvider>
            <GithubLoginAction {...props} />
        </GithubOAuthProvider>
    )
}


export const GithubLoginAction = (props) => {
    
    // useEffect(()=>{

    //     console.log('githubLoginaction ,', props);
    // },[])
    
    
    const URL = "https://github.com/login/oauth/authorize";
    const redirect_uri = 'http://localhost:3000/user/provider/github/GithubOAuthProvider';


    const loginAction = async () => {
        let option = `width = 350, height = 600`
        let popUp = window.open(`${URL}?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${redirect_uri}&scope=user`, 'githubLoginPage', option);
        localStorage.setItem('githubLogin', 'popup');

    }

    return (
        <Button {...props} onClick={()=>loginAction()}/>
    );

}