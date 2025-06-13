import api from './api';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

const login = async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    const { token, user } = response.data;
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return user;
};

const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
};

const register = async (userData) => {
    await api.post('/auth/register', userData);
};

const getCurrentUser = () => {
    const userStr = localStorage.getItem(USER_KEY);
    if (!userStr) return null;
    return JSON.parse(userStr);
};

export default {
    login,
    logout,
    register,
    getCurrentUser,
};