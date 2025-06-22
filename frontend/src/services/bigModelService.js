import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api/bigmodel',
    timeout: 50000,
    headers: {
        'Content-Type': 'application/json',
    },
});

const TOKEN_KEY = 'token';

// HTTP请求拦截器，携带JWT Token
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

/**
 * 通过 HTTP POST 提交问题，返回任务ID
 */
export function askBigModelHttp(userId, question) {
    return apiClient.post('/ask', { userId, question })
        .then(res => {
            if (res.data && res.data.taskId) {
                return res.data.taskId;  // 返回任务ID，前端通过WebSocket监听结果
            }
            throw new Error('无效响应数据，缺少任务ID');
        });
}

/**
 * 建立 WebSocket 连接监听后端推送的任务结果
 * @param {string} userId 用户ID，作为URL参数传给后端，方便用户绑定会话
 * @param {function} onMessageCallback 监听消息回调，返回数据格式自定义
 * @returns {WebSocket} WebSocket 实例，调用方管理关闭
 */
export function createBigModelWebSocket(userId, onMessageCallback) {
    if (!userId) {
        throw new Error('必须传入用户ID以建立WebSocket连接');
    }
    // 带上用户ID作为查询参数，后端根据这个参数绑定连接
    const wsUrl = `ws://localhost:8080/ws/bigmodel?uid=${encodeURIComponent(userId)}`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => console.log('WebSocket连接已建立');

    ws.onmessage = event => {
        let data;
        try {
            data = JSON.parse(event.data);
        } catch {
            // 不是 JSON 格式，直接把字符串传给回调
            data = event.data;
        }
        if (typeof onMessageCallback === 'function') {
            onMessageCallback(data);
        }
    };

    ws.onerror = err => console.error('WebSocket错误', err);

    ws.onclose = event => {
        console.log('WebSocket已关闭, 代码:', event.code);
        // 可在这里实现断线重连逻辑（可选）
    };

    return ws;
}