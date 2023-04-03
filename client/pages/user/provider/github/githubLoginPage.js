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
    const URL = "https://github.com/login/oauth/authorize";
    const redirect_uri = 'http://localhost:3000/user/provider/github/GithubOAuthProvider';

    
    const onSuccessHandler = () => {

    }

    const loginAction = async () => {
        let option = `width = 350, height = 600`
        let popUp = window.open(`${URL}?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${redirect_uri}`, 'githubLoginPage', option);
        
        localStorage.setItem('githubLogin', 'popup');
        // console.log('popup ', popUp, popUp.window.location.href);
        // window.location.assign(`${URL}?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`)

        // await axios.get(`${URL}?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`).then(res => {
        //     console.log('github.login action , ', res);
        // })
        // popUp.onload = () => {
        //     const queryString = popUp.window.location.search;
        //     console.log('q' , queryString);
        // }

        // const urlParams = new URLSearchParams(queryString)
        // const codeParam = urlParams.get("code")
    }

    return (
        <Button {...props} onClick={()=>loginAction()}/>
    );

}