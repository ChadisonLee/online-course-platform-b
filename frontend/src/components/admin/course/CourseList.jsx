import React from 'react';

export default function CourseList({ courses, onEditCourse, onDeleteCourse }) {
    if (!courses || courses.length === 0) {
        return <p style={styles.emptyText}>暂无课程</p>;
    }

    return (
        <div style={styles.gridContainer}>
            {courses.map(course => (
                <div key={course.id} style={styles.card}>
                    <h3 style={styles.title}>{course.title}</h3>
                    <p style={styles.description}>{course.description || '暂无描述'}</p>
                    <div style={styles.buttonGroup}>
                        <button
                            style={{ ...styles.button, ...styles.editButton }}
                            onClick={() => onEditCourse && onEditCourse(course.id)}
                            aria-label={`编辑课程 ${course.title}`}
                            type="button"
                        >
                            编辑
                        </button>
                        <button
                            style={{ ...styles.button, ...styles.deleteButton }}
                            onClick={() => onDeleteCourse && onDeleteCourse(course.id)}
                            aria-label={`删除课程 ${course.title}`}
                            type="button"
                        >
                            删除
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

const styles = {
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 24,
        width: '100%',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: '1.5rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        userSelect: 'none',
        minHeight: 180,
    },
    title: {
        fontSize: '1.3rem',
        fontWeight: '700',
        color: '#2c3e50',
        marginBottom: 10,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    description: {
        flexGrow: 1,
        fontSize: '1rem',
        color: '#555',
        marginBottom: 20,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 12,
    },
    button: {
        padding: '8px 14px',
        borderRadius: 6,
        border: 'none',
        fontWeight: '600',
        fontSize: '0.9rem',
        cursor: 'pointer',
        userSelect: 'none',
        transition: 'background-color 0.3s ease',
    },
    editButton: {
        backgroundColor: '#357ae8',
        color: '#fff',
    },
    deleteButton: {
        backgroundColor: '#e74c3c',
        color: '#fff',
    },
    emptyText: {
        fontStyle: 'italic',
        color: '#999',
        textAlign: 'center',
        padding: '40px 0',
        userSelect: 'none',
    },
};