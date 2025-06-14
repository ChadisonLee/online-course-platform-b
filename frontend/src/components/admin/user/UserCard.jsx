import React, { useState } from 'react';

export default function UserCard({ user, onDelete }) {
    const [hover, setHover] = useState(false);

    const cardStyle = {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: '1.5rem',
        boxShadow: hover
            ? '0 12px 24px rgba(0,0,0,0.15)'
            : '0 4px 12px rgba(0,0,0,0.1)',
        transform: hover ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'default',
        userSelect: 'none',
        width: 280,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    };

    const nameStyle = {
        fontSize: '1.3rem',
        fontWeight: '700',
        color: '#2c3e50',
        marginBottom: 8,
    };

    const emailStyle = {
        fontSize: '1rem',
        color: '#555',
        marginBottom: 12,
        wordBreak: 'break-word',
    };

    const roleStyle = {
        fontSize: '0.9rem',
        color: '#888',
        marginBottom: 16,
    };

    const buttonStyle = {
        alignSelf: 'flex-start',
        backgroundColor: '#e74c3c',
        color: '#fff',
        border: 'none',
        padding: '8px 14px',
        borderRadius: 6,
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    };

    return (
        <div
            style={cardStyle}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            tabIndex={0}
            onFocus={() => setHover(true)}
            onBlur={() => setHover(false)}
            role="region"
            aria-label={`User card for ${users.username}`}
        >
            <div>
                <div style={nameStyle}>{users.username}</div>
                <div style={emailStyle}>{users.email}</div>
                <div style={roleStyle}>Role: {users.role}</div>
            </div>

            <button
                style={buttonStyle}
                onClick={() => onDelete && onDelete(user.id)}
                aria-label={`Delete user ${user.username}`}
            >
                删除
            </button>
        </div>
    );
}