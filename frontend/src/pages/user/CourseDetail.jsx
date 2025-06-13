import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import courseService from '../../services/courseService';
import Loading from '../../components/common/Loading';
import CourseDetail from '../../components/course/CourseDetail';

export default function CourseDetailPage() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        courseService.getCourseById(id)
            .then(data => setCourse(data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <Loading />;
    if (!course) return <p>Course not found.</p>;

    return (
        <div>
            <CourseDetail course={course} />
        </div>
    );
}