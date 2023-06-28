// import axios from "../middleware/axiosInstance"
import axios from '../middleware/axiosInterceptorHook';
import { ADD_PROVIDER, DELETE_PROVIDER, REFRESH_TOKEN } from "./url/enum/auth.api.url"

export const getNewToken = async (refreshToken) => {
    return await axios.post(`${REFRESH_TOKEN}`, {}, {
        headers : {
            'RefreshToken':refreshToken,
        }
    })
}

export const addProvider = async(data) => {
    return await axios.post(ADD_PROVIDER, data);
}

export const deleteProvider = async(data) => {
    return await axios.post(DELETE_PROVIDER, data);
}