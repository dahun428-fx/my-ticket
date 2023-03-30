import axios from "../middleware/axiosInstance";
import { GET_USER, USER_LOGIN, USER_LOGIN_OAUTH2, USER_SIGN_UP } from "./url/enum/user.api.url";


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