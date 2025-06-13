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
                width: 200,
                background: '#f7f7f7',
                padding: '1rem',
                borderRight: '1px solid #ddd',
                height: 'calc(100vh - 120px)',
                boxSizing: 'border-box',
            }}
        >
            <nav>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {navItems.map(({ path, label }) => (
                        <li key={path} style={{ marginBottom: '1rem' }}>
                            <Link
                                to={path}
                                style={{
                                    color: location.pathname === path ? '#61dafb' : '#333',
                                    fontWeight: location.pathname === path ? 'bold' : 'normal',
                                    textDecoration: 'none',
                                }}
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}