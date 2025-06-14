// api.js
import axios from 'axios';

// 创建一个Axios实例
const api = axios.create({
    // *** 关键：确保 baseURL 是您后端API的正确根路径 ***
    baseURL: 'http://localhost:8080/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

const TOKEN_KEY = 'token';

// 请求拦截器（保留之前添加的JWT Token逻辑）
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应拦截器（可选，用于处理401等错误）
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem(TOKEN_KEY);
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;