import axios, { type InternalAxiosRequestConfig } from 'axios';
import { store } from '~/store';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = store.getState().auth.token;
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;