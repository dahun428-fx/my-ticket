import KakaoOAuthProvider from "./kakaoOAuthProvider";
import Button from '../../../../Component/Common/Button'

const KakaoLoginPage = () => {

    return(
        <KakaoOAuthProvider clientId={process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}>
            <KakaoLoginAction {...props} />
        </KakaoOAuthProvider>
    )
}

export const KakaoLoginAction = (props) => {

    const onSuccessHandler = async ( tokenResponse ) => {
        console.log(tokenResponse);
    }

    const loginAction = async () => {
        props.showauthwindow({
            onSuccess:onSuccessHandler
        })
    }

    return (
        <Button title={props.title} variant={props.variant} disabled={props.disabled} onClick={()=>loginAction()} />
    )
}

export default KakaoLoginPage;