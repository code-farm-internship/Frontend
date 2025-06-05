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
        const config = error.config as CustomAxiosRequestConfig;

        if (
            axios.isAxiosError(error) &&
            error.response?.status === 401 &&
            !config._isRetry &&
            config.url !== '/auth/refresh'
        ) {
            try {
                config._isRetry = true;

                const { accessToken } = await authService.refreshToken();
                setAccessToken(accessToken);

                return await instance(config); // retry original request
            } catch (refreshError) {
                const status = (refreshError as AxiosError).response?.status;

                if ([401, 403].includes(status || 0)) {
                    useUserStore.getState().clearUserData();

                    if (window.location.pathname !== PUBLIC_ROUTES.LOGIN) {
                        navigate(PUBLIC_ROUTES.LOGIN);
                    }
                }

                const reason = refreshError instanceof Error ? refreshError : new Error('Token refresh failed');
                return Promise.reject(reason);
            }
        }

        const reason = error instanceof Error ? error : new Error('Axios error');
        return Promise.reject(reason);
    },
);
