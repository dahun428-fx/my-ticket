import axios from 'axios';
import getConfig from '../configs/config.export';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { getSession } from 'next-auth/react';
import setError from './axiosErrorInstance';

const config = getConfig();
const instance = axios.create({
    baseURL:  config.baseUrl,
    headers: {
        'Content-Type': 'application/json',
    }
})

const AxiosInterceptor = (props) => {

    const reqInterceptor = async request => {
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
        return response;
    }

    const errInterceptor = error => {
        return setError(error);
    }

    const reqinterceptor = instance.interceptors.request.use(reqInterceptor);
    const resinterceptor = instance.interceptors.response.use(resInterceptor, errInterceptor);

    useEffect(()=>{
      return () => {
            instance.interceptors.request.eject(reqinterceptor);
            instance.interceptors.response.eject(resinterceptor);
        };
    },[
        reqinterceptor, resinterceptor
    ]);

    return props.children;
}


export default instance;
export { AxiosInterceptor }