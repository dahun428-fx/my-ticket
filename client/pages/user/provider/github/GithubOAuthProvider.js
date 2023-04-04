import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react"
import { addProvider } from "../../../../api/auth";

export default function GithubOAuthProvider ({children}) {

    const [popup, setPopup] = useState(null);
    const [ isToken, setIsToken ] = useState(false);
    const router = useRouter();


    useEffect(()=>{
        // (()=>{
            // window.addEventListener('message',getWinMesg);
        // })();
        
        
        if(!popup) {
            return;
        }
        // window.removeEventListener('message',getWinMesg);
        // const timer = setInterval(()=>{

        //     if(!popup){
        //         timer && clearInterval(timer);
        //         return;
        //     }
        //     // const currentUrl = popup.location.href;
        //     // console.log(currentUrl)
        //     // const currentUrl = "";
        //     // popup.postMessage(hello,'*');
        //     // window.addEventListener('message', (e)=>{
        //     //     console.log(e.origin);
        //     // })
            window.addEventListener('message', getWinMesg)
        //     // if(!currentUrl) {
        //     //     return;
        //     // }
        //     // // const urlParams = new URLSearchParams(currentUrl)
        //     // const urlParams = new URL(currentUrl).searchParams;
        //     // const codeParam = urlParams.get("code");
        //     // console.log('currentUrl ', currentUrl, 'code Param : ', codeParam);
        //     // if(codeParam) {
        //     //     popup.close();
        //     //     console.log(`The popup URL has URL code param = ${codeParam}`);
        //     // }


        // }, 500)
        return () => {
            window.removeEventListener('message', getWinMesg);
        }
    },[popup]);

    




    // const [ data, setData ] = useState();
    // const [ tokenResponse, setTokenResponse ] = useState({});
    // const [ apiStatus, setApiStatus ] = useState(false);
    // const router = useRouter();
    // const getAccessTokenURL = `/github/login/oauth/accessToken`;


    // useEffect(()=>{

    //     (async()=>{
    //         const tokenResponse = await getAccessToken();
    //         if(tokenResponse && tokenResponse?.access_token) {
    //             console.log('tokenResponse redirect', tokenResponse);
                

    //             const accessToken = tokenResponse.access_token;
    //             const getEmail = await axios.get('https://api.github.com/user/emails', {
    //                 headers : { Authorization : `Bearer ${accessToken}`}
    //             }).then(res => {
    //                 // console.log('access token get user -- email ', res.data);
    //                 return res.data[0]?.email;
    //             });
    //             const getData = await axios.get('https://api.github.com/user', {
    //                 headers : { Authorization : `Bearer ${accessToken}`}
    //             }).then(res => {
    //                 // console.log('access token get user ', res.data);
    //                 return res.data;
    //             });

    //             console.log('re getEmail ', getEmail, ' re getData ', getData);
    //             const user = {
    //                 id : getData.id,
    //                 email : getEmail,
    //                 name : getData.name,
    //                 image : getData.avatar_url
    //             }
    //             const provider = 'github';
    //             console.log('user ' , user , ' provider' ,provider);

    //             const providerRes = await addProvider({user, provider}).then(res => {
    //                 parent.console.log('addProvider ... ', parent.window)
    //             }).catch(error => {
    //                 parent.console.log(error)
    //             });
    //             console.log(providerRes);
    //             setIsToken(true);

    //         }
    //     })();

    // },[isToken]);

    // const getAccessToken = async () => {
    //     const queryString = window.location.search
    //     const urlParams = new URLSearchParams(queryString)
    //     const codeParam = urlParams.get("code");
    //     const getAccessTokenURL = `/github/login/oauth/accessToken`;

    //     if(codeParam && !isToken) {
    //         console.log('redirect // codeParam', codeParam);
    //         return await axios.post(`${getAccessTokenURL}/${codeParam}`, {
    //             // redirect_uri : redirectUri
    //         }, {
    //             headers: {
    //                 Accept: 'application/json',
    //             }
    //         })
    //         .then(res => res.data);
    //     }
    //     return null;
    // }
    const getWinMesg = (e) => {
        console.log('new mmmmmm: ',e.data);
    }

    const popupOpen = () => {
        const URL = "https://github.com/login/oauth/authorize";
        // const redirect_uri = 'http://localhost:3000/user/provider/github/GithubOAuthProvider';
        const redirect_uri = window.location.href;
        // const redirect_uri = 'http://localhost:3000/user/provider/github/githubRedirectPage';
        const option = `width = 350, height = 600`
        let popUp = window.open(`${URL}?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${redirect_uri}&scope=user`, 'githubLoginPage', option);
        // .opener.postMessage({url:window.location.href}, '*');
        // popUp.opener.postMessage({hello:'hello'}, '*');
        popUp.opener.postMessage({url:popUp.location.href}, '*');
        // popUp.onload = () => {
        //     window.parent.postMessage({hello : 'parent'}, '*');
        // }
        // popUp.addEventListener('message', (e)=>{
        //     console.log(e.data);
        // })
        setPopup(popUp);
    }
 

    // const popupClose = () => {

    // }

    // const onSuccessHanlder = () => {

    // }
    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { popupopen: ()=>{popupOpen()} });
        }
        return child;
    });
    return (
        <>
        {childrenWithProps}
        </>
    )
}