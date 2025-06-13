import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // 初始化时尝试从本地获取当前用户信息
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);
    }, []);

    // 登录方法，调用服务，设置用户状态
    const login = async (username, password) => {
        const loggedUser = await authService.login(username, password);
        setUser(loggedUser);
    };

    // 登出方法，清除本地状态
    const logout = () => {
        authService.logout();
        setUser(null);
    };

    // 注册方法
    const register = async (userData) => {
        await authService.register(userData);
        // 注册成功后可以自动登录或跳转登录页，视业务需求
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}