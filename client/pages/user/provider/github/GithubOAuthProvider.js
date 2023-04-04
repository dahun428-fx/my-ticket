import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { addProvider } from "../../../../api/auth";

export default function GithubOAuthProvider ({children}) {

    const [ data, setData ] = useState();
    const [ tokenResponse, setTokenResponse ] = useState({});
    const [ apiStatus, setApiStatus ] = useState(false);
    const router = useRouter();

    // const clientId = `${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`;
    // const redirectUri = `http://localhost:3000/user/provider/github/GithubOAuthProvider`;
    // const clientSecret = `${process.env.NEXT_PUBLIC_GITHUB_CLIENT_PW}`;
    // const getAccessTokenURL = `https://github.com/login/oauth/access_token`;
    const getAccessTokenURL = `/github/login/oauth/accessToken`;

    useEffect(()=>{

        (async () => {
            const queryString = window.location.search
            const urlParams = new URLSearchParams(queryString)
            const codeParam = urlParams.get("code");
    
            if(codeParam) {
                console.log('codeParam', codeParam);
                setData({
                    // client_id : clientId,
                    // client_secret : clientSecret,
                    code : codeParam,
                    // redirect_uri : redirectUri
                });
            }

            (async()=>{
                if(data && localStorage.getItem('githubLogin')) {
                    console.log('provider data', data);
                    localStorage.removeItem('githubLogin')
                    await axios.post(`${getAccessTokenURL}/${codeParam}`, {}, {
                        headers: {
                          Accept: 'application/json',
                        }
                    }).then(res => setTokenResponse(res.data));
                }
    
            })();
        })();

    },[router]);

    useEffect(()=>{

        console.log('tokenResponse', tokenResponse);
        if(tokenResponse && tokenResponse?.access_token) {
            const accessToken = tokenResponse.access_token;
            (async()=>{
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
                console.log('getEmail ', getEmail, 'getData ', getData);
                // if(getEmail && getData) {
                //     setApiStatus(true);
                // }
                // if(apiStatus) {
                    const user = {
                        id : getData.id,
                        email : getEmail,
                        name : getData.name,
                        image : getData.avatar_url
                    }
                    const provider = 'github';
                    console.log('user ' , user , ' provider' ,provider);

                    const providerRes = await addProvider({user, provider}).then(res => {
                    });
                    console.log(providerRes);
                // }
                
            })();
        }



    },[tokenResponse])

    const onSuccessHanlder = () => {

    }

    return (
        <>
            {children}
        </>
    )
}