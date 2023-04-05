import axios from "axios";
import React, { useEffect, useMemo, useState } from "react"

export default function GithubOAuthProvider (props) {

    const [ clientId, setClientId ]= useState("");
    const [ authURL, setAuthURL ] = useState("");
    const [ redirectUri, setRedirectUri ] = useState("");
    const [ accessTokenUri, setAccessTokenUri ] = useState("");

    useEffect(()=>{

        setClientId(props.clientId);
        setAuthURL(`https://github.com/login/oauth/authorize`);
        setRedirectUri(window.location.href);
        setAccessTokenUri(`/github/login/oauth/accessToken`);
    },[])
 
    //Authorization popup window code
    const ShowAuthWindow = async (options) => {
        options.access_token_uri = options.access_token_uri || accessTokenUri;
        options.redirect_uri = options.redirect_uri || redirectUri; 
        options.auth_url = options.auth_url || authURL;
        options.client_id = options.client_id || clientId;
        options.windowName = options.windowName ||  'ConnectWithOAuth'; // should not include space for IE
        options.windowOptions = options.windowOptions || 'location=0,status=0,width=400,height=800';
        options.onSuccess = options.onSuccess || function(){ window.location.reload(); };
        options.path = options.path || `${options.auth_url}?client_id=${options.client_id}&redirect_uri=${options.redirect_uri}&scope=user`;
      
        var that = window;
        that._oauthWindow = window.open(options.path, options.windowName, options.windowOptions);
        
        that._oauthInterval = window.setInterval(
            
        (async()=>{

            try {
                if(!that._oauthWindow) {
                    that._oauthInterval && clearInterval(that._oauthInterval);
                    return;
                }

                const currentUrl = that._oauthWindow.location.href;
                if(!currentUrl) {
                    return;
                }
                const urlParams = new URL(currentUrl).searchParams;
                const codeParam = urlParams.get("code");
                console.log('currentUrl ', currentUrl, 'code Param : ', codeParam)
                if(codeParam) {
                    const {data} = await axios.post(`${options.access_token_uri}/${codeParam}`,{},{headers:{Accept: 'application/json'}})
                    options.onSuccess(data);
                    that._oauthWindow.close();
                }
                if (that._oauthWindow.closed) {
                    window.clearInterval(that._oauthInterval);
                }    
            } catch (error) {
                console.log(error);
            }
           
        }),1000);    

    } 
    const childrenWithProps = React.Children.map(props.children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { showauthwindow: (options)=>{ShowAuthWindow(options)} });
        }
        return child;
    });

    return (
        <>
        {childrenWithProps}
        </>
    )
}