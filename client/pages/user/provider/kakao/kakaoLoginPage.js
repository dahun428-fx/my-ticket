import KakaoOAuthProvider from "./kakaoOAuthProvider";
import Button from '../../../../Component/Common/Button'
import axios from "axios";
import { addProvider } from "../../../../api/auth";

const KakaoLoginPage = (props) => {

    return(
        <KakaoOAuthProvider clientId={process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}>
            <KakaoLoginAction {...props} />
        </KakaoOAuthProvider>
    )
}

export const KakaoLoginAction = (props) => {

    const onSuccessHandler = async ( tokenResponse ) => {
        console.log(tokenResponse);
        if(tokenResponse && tokenResponse?.access_token) {
            const accessToken = tokenResponse.access_token;
            const {data} = await axios.get(`https://kapi.kakao.com/v2/user/me`
            // ,{
            //     // property_keys : ["kakao_account.email"],
            // }
            , 
            {
                headers : {Authorization : `Bearer ${accessToken}`
                , 'Content-Type' : "application/x-www-form-urlencoded;charset=utf-8"
            }
            })
            // console.log('kakao', data);

            const user = {
                id : data?.id,
                email : data?.kakao_account?.email,
                name : "",
                image : data?.kakao_account?.profile?.profile_image_url,
            }
            // console.log('kakao, user , ', user)
            const provider = 'kakao';
            await addProvider({user, provider});
            props.setProviderHandler(provider);
        }
    }

    const loginAction = async () => {
        props.showauthwindow({
            onSuccess:onSuccessHandler
        })
    }

    return (
        <>
            <Button title={props.title} variant={props.variant} disabled={props.disabled} onClick={()=>loginAction()} />
        </>
    )
}

export default KakaoLoginPage;