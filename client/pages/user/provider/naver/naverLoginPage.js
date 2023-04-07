import axios from 'axios'
import Button from '../../../../Component/Common/Button'
import NaverOAuthProvider from './naverOAuthProvider'
import { addProvider } from '../../../../api/auth'

const NaverLoginPage = (props) => {
    return (
        <NaverOAuthProvider clientId={process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}>
            <NaverLoginAction {...props} />            
        </NaverOAuthProvider>
    )
}

export const NaverLoginAction = (props) => {
    const onSuccessHandler = async (tokenResponse) => {
        if(tokenResponse && tokenResponse?.access_token) {

            const accessToken = tokenResponse.access_token;
            const {data} = await axios.get(`/naver/v2/user/me`,{
                headers : { Authorization : `Bearer ${accessToken}`}
            })
            const res = data?.response;
            const user = {
                id : res?.id,
                email : res?.email,
                name : res?.name,
                image : res?.profile_image
            }
            
            const provider = 'naver';
            await addProvider({user, provider});
            props.setProviderHandler(provider);
        }
    }

    const loginAction = async => {
        props.showauthwindow({
            onSuccess:onSuccessHandler
        })
    }
    
    return (
        <Button title={props.title} variant={props.variant} disabled={props.disabled} onClick={()=>loginAction()} />
    )
}


export default NaverLoginPage;