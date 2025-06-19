import axios, { type InternalAxiosRequestConfig, AxiosError } from 'axios';
import { store } from '~/store';
import { login, logout } from '~/context/auth/authSlice';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = store.getState().auth.token;
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
api.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;
        console.log('Interceptando erro:', error.response?.status, error.message);
        if (
            error.response?.status === 401 &&
            originalRequest &&
            !originalRequest._retry &&
            !originalRequest.url?.includes('/auth/refresh')
        ) {
            console.log("401 detectado, tentando refresh");
            originalRequest._retry = true;
            try {
                const res = await api.post('/auth/refresh', {}, { withCredentials: true });
                console.log("Refresh ok, token novo recebido");
                const newAccessToken = res.data.access_token;
                store.dispatch(login({ token: newAccessToken, remember: true }));
                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                }
                return api(originalRequest);
            } catch (refreshError) {
                console.log("Refresh deu erro", refreshError);
                store.dispatch(logout());
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);
export default api;
