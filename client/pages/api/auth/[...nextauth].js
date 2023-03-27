import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

import NextAuth from "next-auth/next";
import { PAGE_LOGIN } from "../../../api/url/enum/user.page.url";
import { oAuth2Login, userLogin } from "../../../api/user";
import { getNewToken } from "../../../api/auth";
import AllowProvider from '../../../configs/config.oAuth2.provider.controll';


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
    }),
    GithubProvider({
        clientId:process.env.GITHUB_CLIENT_ID,
        clientSecret:process.env.GITHUB_CLIENT_PW,
    })

]

//https://dev.to/ifennamonanu/building-google-jwt-authentication-with-nextauth-5g78
const callbacks = {

    signIn : async({user, account, profile, email, credentials}) =>{
        if(account) {
            const {provider} = account;
            if(AllowProvider(provider)) {
                const {data} = await oAuth2Login({user, provider});
                console.log('sign in : ', provider, ', user : ', user);
                if(!data) {
                    return false;
                }
                const {accessToken, refreshToken, accessTokenExpiry } = data;
                account.accessToken = accessToken;
                account.refreshToken = refreshToken;
                account.accessTokenExpiry = accessTokenExpiry;
                return true;
            } else if (provider === 'credentials') {
                return true;
            }
            //user 검색 --> user 없을시에 회원가입 진행 ( db ) --> token 저장
        }
        return false;
    },
    jwt : async ({token, user, account}) => {

        if(account) {

            const {provider} = account;
            if(provider == 'credentials') {
                token.accessToken = user.data.accessToken;
                token.refreshToken = user.data.refreshToken;
                token.accessTokenExpiry = user.data.accessTokenExpiry;
            } else if (AllowProvider(provider)) {
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
    signOut : '/test/signOutSuccess',
}

export const option = {
    providers, callbacks, pages, secret : process.env.NEXTAUTH_SECRET
}

const Auth = (req, res) => {
    
    return NextAuth(req, res, option)
};
export default Auth;