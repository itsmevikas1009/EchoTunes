import axios from "axios";

const getCookieValue = (name) => {
    if (typeof document === "undefined") {
        return "";
    }

    const cookie = document.cookie
        .split("; ")
        .find((entry) => entry.startsWith(`${name}=`));

    return cookie ? decodeURIComponent(cookie.split("=").slice(1).join("=")) : "";
};

const api = axios.create({
    baseURL: import.meta.env.PROD
        ? `${import.meta.env.VITE_API_URL}/api`  // Production backend URL
        : '/api',                               // Dev proxy
    withCredentials: true,
    timeout: 10000,
});

api.interceptors.request.use(
    config => {
        const method = config.method?.toLowerCase();

        if (["post", "put", "patch", "delete"].includes(method)) {
            const csrfToken = getCookieValue("csrf-token");

            if (csrfToken) {
                config.headers = config.headers || {};
                config.headers["x-csrf-token"] = csrfToken;
            }
        }

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
