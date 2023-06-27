// import axios from "../middleware/axiosInstance";
// import axios from "axios";
import axios from '../middleware/axiosInterceptorHook';
import { GET_USER, USER_LOGIN, USER_LOGIN_OAUTH2, USER_SIGN_UP, USER_SGIN_OUT, USER_PROVIDER_INFO, USER_PASSWORD_CHECK, USER_PASSWORD_CHANGE } from "./url/enum/user.api.url";

export const userSignOut = async () => {
    return await axios.get(USER_SGIN_OUT);
}

export const userProviderInfo = async () => {
    return await axios.get(USER_PROVIDER_INFO);
}

export const userSignUp = async(data) => {
    const request = {
        id: data.userid,
        password:data.userpw,
        name:data.username
    }
    return await axios.post(`${USER_SIGN_UP}`,request);
}

export const userLogin = async (data) => {
    const request = {
        id : data.userid,
        password : data.userpw,
    }
    return await axios.post(`${USER_LOGIN}`, request);
}

export const oAuth2Login = async(data) => {
    return await axios.post(USER_LOGIN_OAUTH2,data);
}

export const getUser = async () => {
    return await axios.get(`${GET_USER}`);
}

export const isRightPassword = async(data) => {
    const request = {
        id : data.userid,
        password : data.userpw,
    }
    return await axios.post(USER_PASSWORD_CHECK, request);
}

export const changeUserPwd = async(data) => {
    const request = {
        id : data.userid,
        password : data.userpw,
    }
    return await axios.post(USER_PASSWORD_CHANGE, request);
}