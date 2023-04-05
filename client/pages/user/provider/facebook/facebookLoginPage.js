import axios from 'axios'
import Button from '../../../../Component/Common/Button'
import FacebookOAuthProvider from './facebookOAuthProvider'
import { addProvider } from '../../../../api/auth'

const FacebookLoginPage = (props) => {

    return (
        <FacebookOAuthProvider clientId={process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID}>
            <FacebookLoginAction {...props} />
        </FacebookOAuthProvider>
    )
}

export const FacebookLoginAction = (props) => {
    const onSuccessHandler = async (tokenResponse) => {
        if(tokenResponse && tokenResponse?.access_token) {

            const accessToken = tokenResponse.access_token;
            const {data} = await axios.get(`https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`)

            const user = {
                id : data?.id,
                email : data?.email,
                name : data?.name,
                image : data?.picture?.data?.url
            }
            
            const provider = 'facebook';
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
        <Button title={props.title} variant={props.variant} disabled={props.disabled} onClick={()=>loginAction()} />
    )
}


export default FacebookLoginPage;