import { envVars } from '@/config/env.config';
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getAccessToken, setAccessToken } from '../apiHelpers';
import { authService } from '@/services/auth.service';
import { PUBLIC_ROUTES } from '@/constants/routes';
import { useUserStore } from '@/store/userStore';
import { navigate } from '../navigate';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _isRetry?: boolean;
}

const axiosOptions = {
    baseURL: envVars.API_URL,
    timeout: 20000,
    withCredentials: true,
};

export const instance = axios.create(axiosOptions);

// Request interceptor
instance.interceptors.request.use(
    (config) => {
        const accessToken = getAccessToken();
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error instanceof Error ? error : new Error('Request error')),
);

// Response interceptor
instance.interceptors.response.use(
    <T>(response: AxiosResponse<T>) => response.data,
    async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;

        if (
            axios.isAxiosError(error) &&
            error.response?.status === 401 &&
            !originalRequest._isRetry &&
            originalRequest.url !== 'auth/refresh'
        ) {
            try {
                originalRequest._isRetry = true;
                const { accessToken } = await authService.refreshToken();
                setAccessToken(accessToken);

                return await instance(originalRequest);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const axiosError = error as AxiosError;

                    if (axiosError.status && [401].includes(axiosError.status)) {
                        useUserStore.getState().clearUserData();
                        if (window.location.pathname !== PUBLIC_ROUTES.LOGIN) {
                            navigate('/auth/login');
                        }
                    }
                }

                return Promise.reject(error as Error);
            }
        }

        return Promise.reject(error);
    },
);
