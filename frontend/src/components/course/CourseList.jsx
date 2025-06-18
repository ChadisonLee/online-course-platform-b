import React from 'react';
import CourseCard from './CourseCard';

export default function CourseList({
                                       courses,
                                       selectable = false,
                                       selectedCourses = new Set(),
                                       onToggleSelect = () => {}
                                   }) {
    if (!courses || courses.length === 0) {
        return <p style={styles.emptyText}>No courses available.</p>;
    }

    return (
        <div style={styles.gridContainer}>
            {courses.map(course => (
                <div key={course.id} style={styles.cardWrapper}>
                    {selectable && (
                        <input
                            type="checkbox"
                            style={styles.checkbox}
                            checked={selectedCourses.has(course.id)}
                            onChange={() => onToggleSelect(course.id)}
                            aria-label={`选择课程 ${course.title}`}
                        />
                    )}
                    <CourseCard
                        course={course}
                        selected={selectedCourses.has(course.id)}
                    />
                </div>
            ))}
        </div>
    );
}

const styles = {
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px',
        width: '100%',
    },
    cardWrapper: {
        position: 'relative',
        paddingTop: 24, // 给复选框留空间
        boxSizing: 'border-box',
    },
    checkbox: {
        position: 'absolute',
        top: 4,
        left: 8,
        width: 18,
        height: 18,
        cursor: 'pointer',
        zIndex: 10,
    },
    emptyText: {
        fontStyle: 'italic',
        color: '#999',
        textAlign: 'center',
        width: '100%',
        padding: '40px 0',
        userSelect: 'none',
    },
};