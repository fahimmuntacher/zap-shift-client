import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
const instance = axios.create({
    baseURL: "http://localhost:3000"
})
const useAxiosSecure = () => {
    const {user} = useAuth()
    useEffect(() =>{
        instance.interceptors.request.use(config => {
            config.headers.authorization = `Bearer ${user?.accessToken}`
            return config
        })
    }, [user])
    return instance;

};

export default useAxiosSecure;