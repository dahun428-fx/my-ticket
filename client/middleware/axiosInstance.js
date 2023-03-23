import axios, {HeadersDefaults} from 'axios';
import { USER_LOGIN } from '../api/url/enum/user.api.url';
import { REFRESH_TOKEN } from '../api/url/enum/auth.api.url';
import getConfig from '../configs/config.export';
import Cookies from 'js-cookie';
import setError from './axiosErrorInstance';


const config = getConfig();
const axiosClient = axios.create();

axiosClient.defaults.baseURL = config.baseUrl;
axiosClient.defaults.headers = {
    'Content-Type': 'application/json',
}
axiosClient.interceptors.request.use(
    config => {
        const accessToken = Cookies.get('access_token');
        const refreshToken = Cookies.get('refresh_token');
        if(accessToken && refreshToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
            config.headers['RefreshToken'] = refreshToken;
        }
        return config;
    },
    error => {
        return setError(error);
    }
);

axiosClient.interceptors.response.use(
    res => {
        return res
    },
    async err => {
        const originalConfig = err.config;
        //originalConfig.url !== USER_LOGIN && 
        if(err.response && Cookies.get('refresh_token')) {
            //access token expired
            if(err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    const res = await axios.post(
                        `${REFRESH_TOKEN}`,{},
                        {
                            headers: {
                                'RefreshToken':Cookies.get('refresh_token'),
                            }
                        }
                    );
                    console.log('res', res);
                    const {accessToken, refreshToken }= res.data;

                    Cookies.set('access_token', accessToken);
                    Cookies.set('refresh_token', refreshToken);
                    
                    return axiosClient(originalConfig);
                } catch (error) {
                    Cookies.remove('access_token');
                    Cookies.remove('refresh_token');

                    return setError(error);
                }
            }
        }
        return setError(err);
        // return Promise.reject(err);
    }
)

export default axiosClient;