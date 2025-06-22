import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [userRole, setUserRole] = useState(null);

    // 假设从 localStorage 或其他方式获取用户角色
    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                setUserRole(user?.role || null);
            } catch {
                setUserRole(null);
            }
        }
    }, []);

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/courses', label: 'Courses' },
        { path: '/my-courses', label: 'My Courses' },
        { path: '/profile', label: 'Profile' },
        { path: '/big-model', label: 'Big Model' },
    ];

    // 只有管理员角色才显示 Admin Dashboard
    if (userRole === 'ROLE_ADMIN') {
        navItems.push({ path: '/admin', label: 'Admin Dashboard' });
    }

    const toggleSidebar = () => setIsOpen(open => !open);

    return (
        <>
            {/* 移动端切换按钮 */}
            <button
                onClick={toggleSidebar}
                aria-label={isOpen ? '隐藏导航' : '显示导航'}
                style={styles.toggleButton}
            >
                ☰
            </button>

            {/* 遮罩层，侧边栏打开时显示 */}
            {isOpen && <div style={styles.backdrop} onClick={toggleSidebar} aria-hidden="true" />}

            {/* 侧边栏 */}
            <aside
                aria-label="Sidebar navigation"
                style={{
                    ...styles.sidebar,
                    left: isOpen ? 0 : '-260px',
                }}
            >
                <nav>
                    <ul style={styles.ul}>
                        {navItems.map(({ path, label }) => {
                            const isActive = location.pathname === path;
                            return (
                                <li key={path} style={styles.li}>
                                    <Link
                                        to={path}
                                        style={{
                                            ...styles.link,
                                            color: isActive ? '#61dafb' : '#bbb',
                                            fontWeight: isActive ? '700' : '500',
                                            backgroundColor: isActive ? 'rgba(97, 218, 251, 0.15)' : 'transparent',
                                        }}
                                        aria-current={isActive ? 'page' : undefined}
                                        onMouseEnter={e => {
                                            if (!isActive) {
                                                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                                                e.currentTarget.style.color = '#eee';
                                            }
                                        }}
                                        onMouseLeave={e => {
                                            if (!isActive) {
                                                e.currentTarget.style.backgroundColor = 'transparent';
                                                e.currentTarget.style.color = '#bbb';
                                            }
                                        }}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </aside>
        </>
    );
}

const styles = {
    toggleButton: {
        position: 'fixed',
        top: 12,
        left: 12,
        zIndex: 1100,
        padding: '8px 12px',
        borderRadius: 6,
        border: 'none',
        backgroundColor: '#20232a',
        color: '#61dafb',
        fontSize: '1.5rem',
        cursor: 'pointer',

        // 仅移动端显示
        '@media (minWidth: 769px)': {
            display: 'none',
        },
    },
    backdrop: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 1090,
    },
    sidebar: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: 220,
        height: '100vh',
        background: '#20232a',
        padding: '2rem 1.5rem',
        borderRight: '1px solid #282c34',
        boxSizing: 'border-box',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        transition: 'left 0.3s ease',
        zIndex: 1100,

        // PC端默认显示
        '@media (maxWidth: 768px)': {
            height: '100vh',
            top: 0,
            left: '-260px',
            paddingTop: '3.5rem',
            borderRight: 'none',
            boxShadow: '2px 0 8px rgba(0,0,0,0.5)',
        },
    },
    ul: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
    },
    li: {
        marginBottom: '1.25rem',
    },
    link: {
        display: 'block',
        padding: '10px 14px',
        borderRadius: 8,
        textDecoration: 'none',
        userSelect: 'none',
        transition: 'background-color 0.3s ease, color 0.3s ease',
    },
};