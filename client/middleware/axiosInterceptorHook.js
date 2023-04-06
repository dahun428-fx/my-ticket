import axios from 'axios';
import getConfig from '../configs/config.export';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { getSession } from 'next-auth/react';
import setError from './axiosErrorInstance';
import Loading from '../Component/Common/Loading';
const config = getConfig();
const instance = axios.create({
    baseURL:  config.baseUrl,
    headers: {
        'Content-Type': 'application/json',
    }
})

const AxiosInterceptor = (props) => {

    const [ loading, setLoading ] = useState(false);

    useEffect(()=>{

        const reqInterceptor = async request => {
            setLoading(true);
            console.log('req    ', loading)
            if(!request.url.includes("/api")) {
                return request;
            }
            const session = await getSession();
            if(session) {
                const { accessToken, refreshToken } = session;
                    request.headers['Authorization'] = `Bearer ${accessToken}`;
                    request.headers['RefreshToken'] = refreshToken;
            }
            return request;
        }        
    
        const resInterceptor = async response => {
            setLoading(false);
            console.log('res   ', loading)
            return response;
        }
    
        const errInterceptor = error => {
            setLoading(false);
            return setError(error);
            // return Promise.reject(error);
        }
    
    
        const reqinterceptor = instance.interceptors.request.use(reqInterceptor);
        const resinterceptor = instance.interceptors.response.use(resInterceptor, errInterceptor);
        // setLoading(false);
        return () => {
            instance.interceptors.request.eject(reqinterceptor);
            instance.interceptors.response.eject(resinterceptor);
            setLoading(false);
        };
    },[
        // reqinterceptor, resinterceptor
        // instance
    ]);

    return (
    <>
    {loading && <Loading />}
    {/* {!loading &&  */}
    <>
        {props.children}
    </>
    {/* } */}
    </>
    )
    // return props.children;
}


export default instance;
export { AxiosInterceptor }