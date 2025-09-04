import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.PROD
        ? `${import.meta.env.VITE_API_URL}/api`  // Production backend URL
        : '/api',                               // Dev proxy
    withCredentials: true,
    timeout: 10000,
});

api.interceptors.request.use(
    config => {
        if (import.meta.env.DEV) {
            console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
        }
        return config;
    },
    error => Promise.reject(error)
);

api.interceptors.response.use(
    response => response.data,
    error => {
        if (import.meta.env.DEV) {
            console.error('API Error:', error.response?.data || error.message);
        }
        return Promise.reject(error);
    }
);

export default api;
