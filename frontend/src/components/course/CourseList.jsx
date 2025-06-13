import React from 'react';
import CourseCard from './CourseCard';

export default function CourseList({ courses }) {
    if (!courses || courses.length === 0) {
        return <p>No courses available.</p>;
    }

    return (
        <div>
            {courses.map(course => (
                <CourseCard key={course.id} course={course} />
            ))}
        </div>
    );
}