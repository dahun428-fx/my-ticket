import { REFRESH_TOKEN } from "../../../api/url/enum/auth.api.url"
import CredentialsProvider from "next-auth/providers/credentials";
// import * as GoogleCustomProvider from "next-auth/providers"
// import Providers from "next-auth/providers/"
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { USER_LOGIN } from "../../../api/url/enum/user.api.url";
import NextAuth from "next-auth/next";
import { PAGE_LOGIN } from "../../../api/url/enum/user.page.url";
import { oAuth2Login, userLogin } from "../../../api/user";
import { getNewToken } from "../../../api/auth";

async function refreshAccessToken(tokenObject) {
    try {
        
        const tokenResponse = await getNewToken(tokenObject.refreshToken);

        return {    
            accessToken : tokenResponse.data.accessToken,
            refreshToken : tokenResponse.data.refreshToken,
            accessTokenExpiry : tokenResponse.data.accessTokenExpiry,
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

                const user = await userLogin({userid:id, userpw:password});
                const {accessToken, refreshToken} = user.data;

                if(accessToken && refreshToken) {
                    return user;
                }
                return null;
            } catch (error) {
                Promise.reject(error);
            }
        }
    }),
    GoogleProvider({
        clientId:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_PW,
        // authorization: {
        //     params: {
        //       prompt: "consent",
        //       access_type: "offline",
        //       response_type: "code"
        //     }
        // }
    })
]
//https://dev.to/ifennamonanu/building-google-jwt-authentication-with-nextauth-5g78
const callbacks = {
    signIn : async({user, account, profile, email, credentials}) =>{
        if(account) {
            const {provider} = account;
            if(provider === 'google') {
                const {data} = await oAuth2Login({user, provider});
                if(!data) {
                    return false;
                }
                const {accessToken, refreshToken, accessTokenExpiry } = data;
                account.accessToken = accessToken;
                account.refreshToken = refreshToken;
                account.accessTokenExpiry = accessTokenExpiry;
                return true;
            }
            //user 검색 --> user 없을시에 회원가입 진행 ( db ) --> token 저장
        }
        return true;
    },
    jwt : async ({token, user, account}) => {

        if(account) {

            const {provider} = account;
            if(provider == 'credentials') {
                token.accessToken = user.data.accessToken;
                token.refreshToken = user.data.refreshToken;
                token.accessTokenExpiry = user.data.accessTokenExpiry;
            } else if (provider === 'google') {
                
                token.accessToken = account.accessToken;
                token.refreshToken = account.refreshToken;
                token.accessTokenExpiry = account.accessTokenExpiry;
            }
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
        session.refreshToken = token.refreshToken;
        session.accessTokenExpiry = token.accessTokenExpiry;
        session.error = token.error;
        return Promise.resolve(session);
    }
}

const pages = {
    signIn : PAGE_LOGIN,
    // signOut : '/test/loginSuccess',
}

export const option = {
    providers, callbacks, pages, secret : process.env.NEXTAUTH_SECRET
}

const Auth = (req, res) => {
    
    return NextAuth(req, res, option)
};
export default Auth;