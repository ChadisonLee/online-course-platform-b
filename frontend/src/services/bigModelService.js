import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api/bigmodel', // 注意这里的协议 http://
    timeout: 100000,
    headers: {
        'Content-Type': 'application/json',
    },
});

const TOKEN_KEY = 'token';

// 请求拦截器（保留之前添加的JWT Token逻辑）
apiClient.interceptors.request.use(
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

/**
 * 建立 WebSocket 连接（调用后端接口触发服务端创建连接）
 * 注意：该接口是通知后端新建连接，具体连接维护在后端
 */
export function createWebSocketConnection() {
    return apiClient.post('/connect');
}

/**
 * 关闭 WebSocket 连接（调用后端接口通知断开）
 */
export function destroyWebSocketConnection() {
    return apiClient.post('/disconnect');
}

/**
 * 向大模型提问，获取回答
 * @param {string} question 用户的问题文本
 * @returns {Promise<string>} 返回大模型的回答文本
 */
export function askBigModel(question) {
    return apiClient.post('/ask', { question })
        .then(res => {
            if (res.data && res.data.answer) {
                console.log(res.data);
                return res.data.answer;
            }
            throw new Error('无效的响应数据');
        });
}