import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"

export default function GithubOAuthProvider ({children}) {

    const [ data, setData ] = useState();
    const router = useRouter();

    const clientId = `${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`;
    const redirectUri = `http://localhost:3000/user/provider/github/GithubOAuthProvider`;
    const clientSecret = `${process.env.NEXT_PUBLIC_GITHUB_CLIENT_PW}`;
    const getAccessTokenURL = `https://github.com/login/oauth/access_token`;

    useEffect(()=>{

        (async () => {
            const queryString = window.location.search
            const urlParams = new URLSearchParams(queryString)
            const codeParam = urlParams.get("code");
    
            if(codeParam) {
                console.log('codeParam', codeParam);
                setData({
                    client_id : clientId,
                    client_secret : clientSecret,
                    code : codeParam,
                    redirect_uri : redirectUri
                });
            }

            (async()=>{
                if(data && localStorage.getItem('githubLogin')) {
                    console.log('provider data', data);
                    localStorage.removeItem('githubLogin')
                    await axios.post(getAccessTokenURL, data, {
                        headers: {
                          Accept: 'application/json',
                        }})
                               .then(res => {
                                console.log(res);
                               })
        
        
                }
    
            })();
        })();

    },[router]);

    return (
        <>
            {children}
        </>
    )
}