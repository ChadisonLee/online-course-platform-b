import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // 根据后端实际地址修改
    timeout: 10000,
});

// 请求拦截器，自动添加Authorization头
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => Promise.reject(error));

export default api;