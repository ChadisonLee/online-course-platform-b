import React, { useEffect, useState } from 'react';
import courseService from '../../services/courseService';
import CourseList from '../../components/course/CourseList';
import Loading from '../../components/common/Loading';

export default function Courses() {
    const [courses, setCourses] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        courseService.getCourses()
            .then(data => setCourses(data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Loading />;
    return (
        <div>
            <h1>All Courses</h1>
            <CourseList courses={courses} />
        </div>
    );
}