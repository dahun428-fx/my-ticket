import axios from 'axios';
import Button from '../../../../Component/Common/Button'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
        // (async()=>{
            if(tokenResponse && tokenResponse?.access_token) {

                const accessToken = tokenResponse.access_token;
                const getEmail = await axios.get('https://api.github.com/user/emails', {
                    headers : { Authorization : `Bearer ${accessToken}`}
                }).then(res => {
                    // console.log('access token get user -- email ', res.data);
                    return res.data[0]?.email;
                });
                const getData = await axios.get('https://api.github.com/user', {
                    headers : { Authorization : `Bearer ${accessToken}`}
                }).then(res => {
                    // console.log('access token get user ', res.data);
                    return res.data;
                });

                // console.log('re getEmail ', getEmail, ' re getData ', getData);
                const user = {
                    id : getData.id,
                    email : getEmail,
                    name : getData.name,
                    image : getData.avatar_url
                }
                const provider = 'github';
                // console.log('user ' , user , ' provider' ,provider);

                await addProvider({user, provider});
                props.setProviderHandler(provider);
                // console.log(providerRes);
            }
        // })();
    }

    const loginAction = async () => {
        props.showauthwindow({
            // path:`${"https://github.com/login/oauth/authorize"}?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${window.location.href}&scope=user`,
            onSuccess: onSuccessHandler,
        });
    }

    return (
        <Button title={props.title} variant={props.variant} disabled={props.disabled} onClick={()=>loginAction()} />
    );

}