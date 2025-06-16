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
        <div style={styles.pageContainer}>
            <h1 style={styles.title}>All Courses</h1>
            <div style={styles.courseListWrapper}>
                {courses && courses.length > 0 ? (
                    <CourseList courses={courses} />
                ) : (
                    <p style={styles.emptyText}>暂无课程，敬请期待！</p>
                )}
            </div>
        </div>
    );
}

const styles = {
    pageContainer: {
        maxWidth: 1200,
        margin: '30px auto',
        padding: '30px 24px',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#2c3e50',
        minHeight: '80vh',
        backgroundColor: '#fff',
        borderRadius: 12,
        boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        fontSize: '2.8rem',
        marginBottom: 32,
        fontWeight: '800',
        color: '#1a1a1a',
        textAlign: 'center',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        userSelect: 'none',
        textShadow: '1px 1px 3px rgba(0,0,0,0.1)',
    },
    courseListWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 28,
        justifyContent: 'center',
        width: '100%',
    },
    emptyText: {
        fontSize: '1.4rem',
        color: '#999',
        textAlign: 'center',
        width: '100%',
        padding: '60px 0',
        fontStyle: 'italic',
        userSelect: 'none',
    },

    // 响应式示例（假设你用 CSS-in-JS 或后续可用）
    '@media (max-width: 768px)': {
        pageContainer: {
            padding: '20px 16px',
        },
        title: {
            fontSize: '2rem',
            marginBottom: 24,
        },
        courseListWrapper: {
            gap: 20,
        },
    },
};