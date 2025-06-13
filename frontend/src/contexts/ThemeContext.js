import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    // 默认为 light 主题
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        // 可从 localStorage 或系统偏好读取主题设置
        const savedTheme = localStorage.getItem('app-theme');
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    // 切换主题
    const toggleTheme = () => {
        setTheme(prev => {
            const nextTheme = prev === 'light' ? 'dark' : 'light';
            localStorage.setItem('app-theme', nextTheme);
            return nextTheme;
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}