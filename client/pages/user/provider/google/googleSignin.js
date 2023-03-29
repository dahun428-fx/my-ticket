import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useGoogleAuth, useGoogleUser } from "react-gapi-auth2";
import Button from "../../../../Component/Common/Button";

function GoogleSignin({children}){
    
    const googleLogin = useGoogleLogin({
        scope: "openid email profile",
        onSuccess:async (tokenResponse)=>{
            console.log('success', tokenResponse);
            const userInfo = await axios
                .get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                })
                .then(res => res.data);
            console.log('userinfo : ', userInfo)
        }
    })
    
    return (
        <Button title="google " onClick={()=>googleLogin()} />
    )
}

export default GoogleSignin;