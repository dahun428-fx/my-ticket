import { REFRESH_TOKEN } from "../../../api/url/enum/auth.api.url"
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { USER_LOGIN } from "../../../api/url/enum/user.api.url";
import NextAuth from "next-auth/next";
import Cookies from "js-cookie";

async function refreshAccessToken(tokenObject) {
    try {
        
        const tokenResponse = await axios.post(REFRESH_TOKEN, {},
            {
                headers : {
                    'RefreshToken':tokenObject.refreshToken,
                }
            }
        );
        return {
            accessToken : tokenResponse.data.accessToken,
            refreshToken : tokenResponse.data.refreshToken,
        }

    } catch (error) {
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
                const {accessToken, refreshToken} = user.data;

                if(accessToken) {

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

        if(shouldRefreshTime>0) {
            return Promise.resolve(token);
        }
        
        token = refreshAccessToken(token);
        return Promise.resolve(token);
    },
    session: async({session, token}) => {
        session.accessToken = token.accessToken;
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

const Auth = (req, res) => NextAuth(req, res, option);
export default Auth;