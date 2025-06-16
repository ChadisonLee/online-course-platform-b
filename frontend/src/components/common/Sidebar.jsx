import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/courses', label: 'Courses' },
        { path: '/my-courses', label: 'My Courses' },
        { path: '/profile', label: 'Profile' },
        { path: '/admin', label: 'Admin Dashboard' },
    ];

    return (
        <aside
            style={{
                width: 220,
                background: '#20232a',
                padding: '2rem 1.5rem',
                borderRight: '1px solid #282c34',
                height: 'calc(100vh - 75px)',
                boxSizing: 'border-box',
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
            }}
            aria-label="Sidebar navigation"
        >
            <nav>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {navItems.map(({ path, label }) => {
                        const isActive = location.pathname === path;
                        return (
                            <li key={path} style={{ marginBottom: '1.25rem' }}>
                                <Link
                                    to={path}
                                    style={{
                                        display: 'block',
                                        padding: '10px 14px',
                                        borderRadius: 8,
                                        color: isActive ? '#61dafb' : '#bbb',
                                        fontWeight: isActive ? '700' : '500',
                                        backgroundColor: isActive ? 'rgba(97, 218, 251, 0.15)' : 'transparent',
                                        textDecoration: 'none',
                                        transition: 'background-color 0.3s ease, color 0.3s ease',
                                        userSelect: 'none',
                                    }}
                                    aria-current={isActive ? 'page' : undefined}
                                    onMouseEnter={e => {
                                        if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                                        if (!isActive) e.currentTarget.style.color = '#eee';
                                    }}
                                    onMouseLeave={e => {
                                        if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                                        if (!isActive) e.currentTarget.style.color = '#bbb';
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
    );
}