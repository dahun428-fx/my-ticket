import axios, {HeadersDefaults} from 'axios';
import getConfig from '../configs/config.export';
import setError from './axiosErrorInstance';
import { getSession } from 'next-auth/react';

const config = getConfig();
const axiosClient = axios.create();

axiosClient.defaults.baseURL = config.baseUrl;
axiosClient.defaults.headers = {
    'Content-Type': 'application/json',
}

axiosClient.interceptors.request.use(async(config) => {
    const session = await getSession();
    if(session) {
        const { accessToken, refreshToken } = session;
            config.headers['Authorization'] = `Bearer ${accessToken}`;
            config.headers['RefreshToken'] = refreshToken;
    }
    return config;
}, error =>{
    // return setError(error);
    return Promise.reject(error);
})
 
axiosClient.interceptors.response.use(
    res => {
        return res
    },
    async err => {
        /**
         * next-auth 로 대체
         */
        // const originalConfig = err.config;
        // const session = await getSession();
        // // originalConfig.url !== USER_LOGIN && 
        // if(err.response && session) {
        //     //access token expired
        //     if(err.response.status === 401 && !originalConfig._retry) {
        //         originalConfig._retry = true;

        //         try {
        //             const res = await axios.post(
        //                 `${REFRESH_TOKEN}`,{},
        //                 {
        //                     headers: {
        //                         'RefreshToken':session.refreshToken,
        //                     }
        //                 }
        //             );
                    
        //             return axiosClient(originalConfig);
        //         } catch (error) {

        //             return setError(error);
        //         }
        //     }
        // }
        // setError(err);
        return setError(err);
        // return Promise.reject(err);
    }
)

export default axiosClient;