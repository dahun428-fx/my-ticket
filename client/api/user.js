import axios from "../middleware/axiosInstance";
import { GET_USER, USER_LOGIN } from "./url/enum/user.api.url";


export const userLogin = async (data) => {
    const request = {
        id : data.userid,
        password : data.userpw,
    }
    return await axios.post(`${USER_LOGIN}`, request);
}
export const oAuthLogin = async(data) => {
    const request = {
        id: data.userid,
        name : data.username,
        googleId:data.googleId,
    }
    return await axios.post(`${'/api/user/oauth'}`, request);
}

export const getUser = async () => {
    return await axios.get(`${GET_USER}`);
}