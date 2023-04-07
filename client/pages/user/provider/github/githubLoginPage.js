import axios from 'axios';
import Button from '../../../../Component/Common/Button'
import { useEffect, useState } from 'react';
import GithubOAuthProvider from './GithubOAuthProvider';
import { addProvider } from '../../../../api/auth';



export default function GithubLoginPage(props) {
    


    return (
        <GithubOAuthProvider clientId={process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}>
            <GithubLoginAction {...props} />
        </GithubOAuthProvider>
    )
}


export const GithubLoginAction = (props) => {
    

    const onSuccessHandler = async (tokenResponse) => {
        if(tokenResponse && tokenResponse?.access_token) {

            const accessToken = tokenResponse.access_token;
            const getEmail = await axios.get('https://api.github.com/user/emails', {
                headers : { Authorization : `Bearer ${accessToken}`}
            }).then(res => {
                return res.data[0]?.email;
            });
            const getData = await axios.get('https://api.github.com/user', {
                headers : { Authorization : `Bearer ${accessToken}`}
            }).then(res => {
                return res.data;
            });

            const user = {
                id : getData.id,
                email : getEmail,
                name : getData.name,
                image : getData.avatar_url
            }
            const provider = 'github';

            await addProvider({user, provider});
            props.setProviderHandler(provider);
        }
    }

    const loginAction = async () => {
        props.showauthwindow({
            onSuccess: onSuccessHandler,
        });
    }

    return (
        <>
            <Button title={props.title} variant={props.variant} disabled={props.disabled} onClick={()=>loginAction()} />
        </>
    );

}