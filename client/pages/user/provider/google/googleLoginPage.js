import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
//https://medium.com/@OloriAsabi/google-oauth2-using-the-new-google-identity-services-sdk-for-react-using-jwt-decode-d687d2e05aa2
export default function GoogleLoginPage(){

    const onSuccessHandler = async (tokenResponse) => {

        const userInfo = await axios
            .get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
            }).then(res => res.data);
        console.log('userinfo : ', userInfo)
    }

    return (
        <GoogleOAuthProvider clientId={`${process.env.GOOGLE_CLIENT_ID}`}>
            <GoogleLogin text="login google" render={(renderProps) => (
                <button
                type="button"
                className=""
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                >login google</button>
        )}
                onSuccess={onSuccessHandler}
            >

            </GoogleLogin>
        </GoogleOAuthProvider>
    )
}