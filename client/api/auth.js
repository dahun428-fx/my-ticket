import axios from "../middleware/axiosInstance"
import { REFRESH_TOKEN } from "./url/enum/auth.api.url"

export const getNewToken = async (refreshToken) => {
    return await axios.post(`${REFRESH_TOKEN}`, {}, {
        headers : {
            'RefreshToken':refreshToken,
        }
    })
}