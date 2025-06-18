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
        marginBottom: 6,
    };

    const emailStyle = {
        fontSize: '0.95rem',
        color: '#555',
        marginBottom: 6,
        wordBreak: 'break-word',
    };

    const roleStyle = {
        fontSize: '0.85rem',
        color: '#888',
        marginBottom: 16,
        textTransform: 'capitalize',
    };

    const buttonStyle = {
        backgroundColor: '#e74c3c',
        color: '#fff',
        border: 'none',
        padding: '8px 14px',
        borderRadius: 6,
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    };

    // 直接在组件内定义删除函数
    const handleDelete = () => {
        if (window.confirm(`确定删除用户 "${user.username}" 吗？`)) {
            onDelete && onDelete(user.id);
        }
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
            aria-label={`User card for ${user.username}`}
        >
            <div>
                <div style={nameStyle}>{user.username}</div>
                <div style={emailStyle}>{user.email || '无邮箱'}</div>
                <div style={roleStyle}>{user.role.replace('ROLE_', '')}</div>
            </div>

            <button
                style={buttonStyle}
                onClick={handleDelete}
                aria-label={`Delete user ${user.username}`}
                type="button"
            >
                删除
            </button>
        </div>
    );
}