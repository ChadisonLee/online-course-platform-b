import React, { useEffect, useState } from 'react';
import userService from '../../services/userService';
import CourseList from '../../components/course/CourseList';
import Loading from '../../components/common/Loading';

export default function MyCourses() {
    const [myCourses, setMyCourses] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        userService.getProfile()
            .then(user => setMyCourses(user.enrolledCourses || []))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Loading />;
    return (
        <div>
            <h1>My Courses</h1>
            <CourseList courses={myCourses} />
        </div>
    );
}