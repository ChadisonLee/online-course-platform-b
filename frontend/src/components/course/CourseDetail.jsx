import React, { useState } from 'react';

export default function CourseDetail({ course }) {
    const [hoveredVideoId, setHoveredVideoId] = useState(null);

    if (!course) return <p>Loading course details...</p>;

    return (
        <div style={detailStyles.container}>
            <h2 style={detailStyles.title}>{course.title}</h2>
            <p style={detailStyles.description}>{course.description}</p>

            <section style={detailStyles.section}>
                <h3 style={detailStyles.sectionTitle}>Category</h3>
                <p style={detailStyles.categoryName}>{course.categoryName}</p>
            </section>

            <section style={detailStyles.section}>
                <h3 style={detailStyles.sectionTitle}>Videos</h3>
                {course.video && course.video.length > 0 ? (
                    <ul style={detailStyles.videoList}>
                        {course.video.map(video => (
                            <li
                                key={video.id}
                                style={detailStyles.videoItem}
                                onMouseEnter={() => setHoveredVideoId(video.id)}
                                onMouseLeave={() => setHoveredVideoId(null)}
                            >
                                <a
                                    href={video.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={detailStyles.videoLink}
                                >
                                    {video.title}
                                    <span
                                        style={{
                                            ...detailStyles.urlTooltip,
                                            opacity: hoveredVideoId === video.id ? 1 : 0,
                                            transform: hoveredVideoId === video.id ? 'translateY(0)' : 'translateY(6px)',
                                            pointerEvents: hoveredVideoId === video.id ? 'auto' : 'none',
                                        }}
                                    >
                    {video.url}
                  </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p style={detailStyles.noVideos}>No videos available.</p>
                )}
            </section>
        </div>
    );
}

const detailStyles = {
    container: {
        borderRadius: 12,
        padding: 32,
        boxShadow: 'inset 0 0 12px rgba(0,0,0,0.03), 0 6px 18px rgba(0,0,0,0.1)',
        maxWidth: 720,
        margin: '2rem auto',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#2c3e50',
    },
    title: {
        fontSize: '2.4rem',
        fontWeight: '800',
        marginBottom: 16,
        color: '#1a2a42',
        letterSpacing: '0.03em',
    },
    description: {
        fontSize: '1.2rem',
        marginBottom: 32,
        color: '#4a5d7a',
        lineHeight: 1.6,
    },
    section: {
        marginBottom: 36,
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        boxShadow: '0 3px 10px rgba(0,0,0,0.05)',
    },
    sectionTitle: {
        fontSize: '1.5rem',
        fontWeight: '700',
        marginBottom: 14,
        color: '#2c3e50',
        borderBottom: '2px solid #61a0ff',
        paddingBottom: 6,
    },
    categoryName: {
        fontSize: '1.1rem',
        color: '#3a5068',
        fontWeight: '600',
    },
    videoList: {
        listStyleType: 'disc',
        paddingLeft: 24,
    },
    videoItem: {
        marginBottom: 12,
        transition: 'transform 0.2s ease, color 0.2s ease',
        cursor: 'pointer',
    },
    videoLink: {
        position: 'relative',
        color: '#3498db',
        textDecoration: 'none',
        fontWeight: 600,
        fontSize: '1rem',
        userSelect: 'text',
    },
    urlTooltip: {
        position: 'absolute',
        bottom: '-28px',
        left: 0,
        backgroundColor: '#222',
        color: '#fff',
        padding: '5px 10px',
        fontSize: '0.85rem',
        borderRadius: 5,
        whiteSpace: 'nowrap',
        userSelect: 'all',
        pointerEvents: 'none',
        opacity: 0,
        transform: 'translateY(6px)',
        transition: 'opacity 0.25s ease, transform 0.25s ease',
        zIndex: 100,
    },
    noVideos: {
        fontStyle: 'italic',
        color: '#999',
    },
};