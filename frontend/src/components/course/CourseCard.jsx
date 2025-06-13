import React from 'react';
import { Link } from 'react-router-dom';

export default function CourseCard({ course }) {
    return (
        <div
            style={{
                border: '1px solid #ddd',
                borderRadius: 4,
                padding: '1rem',
                marginBottom: '1rem',
                background: '#fff',
            }}
        >
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <Link to={`/courses/${course.id}`}>View Details</Link>
        </div>
    );
}