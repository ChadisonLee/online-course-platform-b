import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CourseCard({ course, selected = false }) {
    const [hover, setHover] = useState(false);

    const baseShadow = '0 4px 12px rgba(0,0,0,0.1)';
    const hoverShadow = `0 12px 20px rgba(0,0,0,0.25),
                         0 24px 48px rgba(0,0,0,0.15),
                         0 36px 72px rgba(0,0,0,0.1)`;

    const cardStyle = {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: '1.5rem',
        boxShadow: selected
            ? '0 0 0 4px #357ae8, 0 8px 24px rgba(53, 122, 232, 0.6)' // 选中蓝色边框和阴影
            : hover
                ? hoverShadow
                : baseShadow,
        transform: hover ? 'translateY(-20px)' : 'none',
        transition: 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s ease',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 200,
        userSelect: 'none',
        willChange: 'transform, box-shadow',
        border: selected ? 'none' : '1px solid rgba(255, 255, 255, 0.6)',
        background: hover
            ? 'linear-gradient(145deg, #ffffff, #e6e6e6)'
            : '#fff',
        outline: selected ? '2px solid #357ae8' : 'none',
    };

    const linkStyle = {
        alignSelf: 'flex-start',
        textDecoration: 'none',
        color: hover || selected ? '#1a5ea8' : '#3498db',
        fontWeight: '700',
        fontSize: '1rem',
        transition: 'color 0.3s ease',
    };

    const descriptionStyle = {
        flexGrow: 1,
        fontSize: '1rem',
        color: '#555',
        marginBottom: '1.25rem',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
    };

    const titleStyle = {
        fontSize: '1.4rem',
        fontWeight: '800',
        marginBottom: '0.75rem',
        color: '#2c3e50',
    };

    return (
        <div
            style={cardStyle}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            tabIndex={0}
            onFocus={() => setHover(true)}
            onBlur={() => setHover(false)}
            role="link"
            aria-label={`View details for ${course.title}${selected ? ', selected' : ''}`}
        >
            <h3 style={titleStyle}>{course.title}</h3>
            <p style={descriptionStyle}>{course.description}</p>
            <Link to={`/courses/${course.id}`} style={linkStyle}>
                View Details →
            </Link>
        </div>
    );
}