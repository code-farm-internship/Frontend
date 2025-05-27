import { envVars } from '@/config/env.config';
import axios, { AxiosResponse } from 'axios';

const axiosOptions = {
    baseURL: envVars.API_URL,
    timeout: 20000,
    withCredentials: true,
};

export const instance = axios.create(axiosOptions);

instance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error as Error);
    },
);

instance.interceptors.response.use(
    <T>(response: AxiosResponse<T>) => {
        return response.data;
    },
    (error) => {
        return Promise.reject(error as Error);
    },
);
