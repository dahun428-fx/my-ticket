import { REFRESH_TOKEN } from "../../../api/url/enum/auth.api.url"
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { USER_LOGIN } from "../../../api/url/enum/user.api.url";
import NextAuth from "next-auth/next";
import { PAGE_LOGIN } from "../../../api/url/enum/user.page.url";
import { userLogin } from "../../../api/user";
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