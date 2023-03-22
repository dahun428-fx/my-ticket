import axios, {HeadersDefaults} from 'axios';
import { USER_LOGIN } from '../api/url/enum/user.api.url';
import { REFRESH_TOKEN } from '../api/url/enum/auth.api.url';
import getConfig from '../configs/config.export';
import Cookies from 'js-cookie';

const config = getConfig();
const axiosClient = axios.create();

axiosClient.defaults.baseURL = config.baseUrl;
axiosClient.defaults.headers = {
    'Content-Type': 'application/json',
}
axiosClient.interceptors.request.use(
    config => {
        // const accessToken = localStorage.getItem('access_token');
        // const refreshToken = localStorage.getItem('refresh_token');
        const accessToken = Cookies.get('access_token');
        const refreshToken = Cookies.get('refresh_token');
        // console.log('access_token : ', accessToken);
        if(accessToken && refreshToken) {
            config.headers['Authorization'] = accessToken;
            config.headers['RefreshToken'] = refreshToken;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    res => {
        return res
    },
    async err => {
        console.log('cookie ',Cookies.get('refresh_token'))
        // console.log('response interceptor err : ', err);
        const originalConfig = err.config;
        // const refreshToken = Cookies.get('refresh_token');
        if(originalConfig.url !== USER_LOGIN && err.response && Cookies.get('refresh_token')) {
            //access token expired
            if(err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    const res = await axios.post(
                        `${config.apiUrl}/api/v1/auth/refresh`,
                        {
                            Headers:{
                                RefreshToken : Cookies.get('refresh_token')
                                // Authorization: localStorage.getItem('refresh_token')
                            }
                        }
                    );

                    const accessToken = rs.data.data['access_token'];
                    const refreshToken = rs.data.data['refresh_token'];

                    Cookies.set('access_token', accessToken);
                    Cookies.set('refresh_token', refreshToken);
                    // localStorage.setItem('access_token', accessToken);
                    // localStorage.setItem('refresh_token', refreshToken);
                    
                    return axiosClient(originalConfig);
                } catch (error) {
                    // console.log(error);
                    // Cookies.remove('access_token');
                    // Cookies.remove('refresh_token');
                    // localStorage.removeItem('access_token');
                    // localStorage.removeItem('refresh_token');

                    return Promise.reject(error);
                }
            }
        }
        return Promise.reject(err);
    }
)

export default axiosClient;