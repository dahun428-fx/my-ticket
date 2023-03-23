import { REFRESH_TOKEN } from "../../../api/url/enum/auth.api.url"
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { USER_LOGIN } from "../../../api/url/enum/user.api.url";
import NextAuth from "next-auth/next";
import Cookies from "js-cookie";

async function refreshAccessToken(tokenObject) {
    try {
        
        const tokenResponse = await axios.post(`${process.env.NEXTAUTH_URL}/${REFRESH_TOKEN}`, {},
            {
                headers : {
                    // 'Authorization': `Bearer ${tokenObject.accessToken}`,
                    'RefreshToken':tokenObject.refreshToken,
                }
            }
        );
        console.log('tokenResponse', tokenResponse);
        return {    
            accessToken : tokenResponse.data.accessToken,
            refreshToken : tokenResponse.data.refreshToken,
            accessTokenExpiry : tokenResponse.data.accessTokenExpiry,
        }

    } catch (error) {
        console.log('RefreshAccessTokenErrorRefreshAccessTokenErrorRefreshAccessTokenError')
        return {
            ...tokenObject,
            error:"RefreshAccessTokenError",
        }
    }
}

const providers = [
    CredentialsProvider({
        name:'Credentials',
        authorize: async({id, password}) => {
            try {
                const user = await axios.post(`${process.env.NEXTAUTH_URL}/${USER_LOGIN}`, {
                    id, password
                });
                console.log('get session from next auth ,', user.data)
                const {accessToken, refreshToken} = user.data;

                if(accessToken && refreshToken) {
                    return user;
                }
                return null;
            } catch (error) {
                console.log('authr, err : ', error)    
            }
        }
    })
]

const callbacks = {
    jwt : async ({token, user}) => {
        if(user) {
            token.accessToken = user.data.accessToken;
            token.refreshToken = user.data.refreshToken;
            token.accessTokenExpiry = user.data.accessTokenExpiry;
        }
        //accessTokenExpiry 
        const shouldRefreshTime = Math.round(token.accessTokenExpiry - Date.now());
        console.log('expire ', token.accessTokenExpiry, shouldRefreshTime);

        if(shouldRefreshTime>0) {
            return Promise.resolve(token);
        }
        
        token = refreshAccessToken(token);
        console.log('refresh access token excute', token)
        return Promise.resolve(token);
    },
    session: async({session, token}) => {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.accessTokenExpiry = token.accessTokenExpiry;
        session.error = token.error;
        return Promise.resolve(session);
    }
}

const pages = {
    signIn : '/signin',
    signOut : '/test/loginSuccess',
}

export const option = {
    providers, callbacks, pages, secret : process.env.NEXTAUTH_SECRET
}

const Auth = (req, res) => {
    
    return NextAuth(req, res, option)
};
export default Auth;