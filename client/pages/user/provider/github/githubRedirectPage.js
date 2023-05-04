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

                const providerRes = await addProvider({user, provider});
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
            return await axios.post(`${getAccessTokenURL}/${codeParam}`, {
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
