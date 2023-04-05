import axios from 'axios';
import React, { useEffect, useState } from 'react';


const FacebookOAuthProvider = (props) => {

    const [ clientId, setClientId ]= useState("");
    const [ authURL, setAuthURL ] = useState("");
    const [ redirectUri, setRedirectUri ] = useState("");
    const [ accessTokenUri, setAccessTokenUri ] = useState("");

    useEffect(()=>{

        setClientId(props.clientId);
        setAuthURL(`https://www.facebook.com/v16.0/dialog/oauth`);
        setRedirectUri(window.location.href);
        setAccessTokenUri(`/fb/login/oauth/accessToken`);
    },[])

    const ShowAuthWindow = async (options) => {
        options.access_token_uri = options.access_token_uri || accessTokenUri;
        options.redirect_uri = options.redirect_uri || redirectUri; 
        options.auth_url = options.auth_url || authURL;
        options.client_id = options.client_id || clientId;
        options.windowName = options.windowName ||  'ConnectWithOAuth'; // should not include space for IE
        options.windowOptions = options.windowOptions || 'location=0,status=0,width=400,height=800';
        options.onSuccess = options.onSuccess || function(){ window.location.reload(); };
        options.path = options.path || `${options.auth_url}?client_id=${options.client_id}&redirect_uri=${options.redirect_uri}`;
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
                if(codeParam) {
                    const {data} = await axios.get(`${options.access_token_uri}/${codeParam}/${new URL(options.redirect_uri).pathname}`)
                    .catch(err => {
                        that._oauthWindow.close();
                        throw new Error(err);
                    })
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

export default FacebookOAuthProvider;