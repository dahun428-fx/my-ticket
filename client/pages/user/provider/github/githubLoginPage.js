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
    

    // console.log(props)

    const loginAction = async () => {
        props.popupopen();

    }

    return (
        <Button title={props.title} variant={props.variant} onClick={()=>loginAction()}/>
    );

}