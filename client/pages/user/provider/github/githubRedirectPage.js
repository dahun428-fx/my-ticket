import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { addProvider } from "../../../../api/auth";

export default function GithubRedirectPage (props) {

    // const [ tokenRes, setTokenRes ] = useState({});
    const [ isToken, setIsToken ] = useState(false);

    const router = useRouter();

    useEffect(()=>{

        (async()=>{
            const tokenResponse = await getAccessToken();
            if(tokenResponse && tokenResponse?.access_token) {
                // console.log('tokenResponse redirect', tokenResponse);

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

                const providerRes = await addProvider({user, provider}).then(res => {
                    // console.log(opener.window)
                });
                // console.log(providerRes);
                setIsToken(true);

            }
        })();
        if(isToken) {
            window.close();
        }

    },[isToken]);

    const getAccessToken = async () => {
        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString)
        const codeParam = urlParams.get("code");
        const getAccessTokenURL = `/github/login/oauth/accessToken`;

        if(codeParam && !isToken) {
            // console.log('redirect // codeParam', codeParam);
            return await axios.post(`${getAccessTokenURL}/${codeParam}`, {
                // redirect_uri : redirectUri
            }, {
                headers: {
                    Accept: 'application/json',
                }
            })
            .then(res => res.data);
        }
        return null;
    }

    return (
        <>hi</>
    );
}

// export async function getServerSideProps({query}){

//     const getAccessTokenURL = `/github/login/oauth/accessToken`;
//     // const queryString = window.location.search
//     const queryString = query;
//     const urlParams = new URLSearchParams(queryString)
//     const codeParam = urlParams.get("code");

//     console.log('code ====== server ', codeParam)

//     if(codeParam) {
//         const tokenRes = await axios.post(`${getAccessTokenURL}/${codeParam}`, {
//             // redirect_uri : redirectUri
//         }, {
//             headers: {
//                 Accept: 'application/json',
//             }
//         })
//         console.log('tokenRes' ,tokenRes.data);
//     }

//     return {
//         props :{}
//     }
// }
