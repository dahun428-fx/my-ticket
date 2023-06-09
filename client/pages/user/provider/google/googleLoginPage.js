import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import axios from 'axios';
import { addProvider } from "../../../../api/auth";
import Button from "../../../../Component/Common/Button";
//https://medium.com/@OloriAsabi/google-oauth2-using-the-new-google-identity-services-sdk-for-react-using-jwt-decode-d687d2e05aa2
export default function GoogleLoginPage(props){


    return (
        <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}>
            <GoogleLoginAction {...props} />
        </GoogleOAuthProvider>
    )
}

export const GoogleLoginAction = (props) => {

    const onSuccessHandler = async (tokenResponse) => {

        const userInfo = await axios
                                    .get('https://www.googleapis.com/oauth2/v3/userinfo', {
                                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                                    }).then(res => {
                                        const {sub, email, name, image} = res.data;
                                        const providerData = {
                                            id : sub,
                                            email, 
                                            name,
                                            image
                                        }
                                        return providerData;
                                    });
            const provider = 'google';
            await addProvider({user:userInfo, provider});
            props.setProviderHandler(provider);
    }

    const loginAction = useGoogleLogin({
        onSuccess:onSuccessHandler,
    })
   
    return (
        <Button title={props.title} variant={props.variant} disabled={props.disabled} onClick={()=>loginAction()} />
    )
}