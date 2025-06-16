import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import courseService from '../../services/courseService';
import Loading from '../../components/common/Loading';
import CourseDetail from '../../components/course/CourseDetail';

export default function CourseDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        courseService.getCourseById(id)
            .then(data => setCourse(data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <Loading />;
    if (!course) return <p style={styles.notFound}>Course not found.</p>;

    return (
        <>
            {/* 返回按钮固定在左上角，页面内容外部 */}
            <button
                style={styles.backButton}
                onClick={() => navigate(-1)}                aria-label="Go back"
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2a75d8'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#357ae8'}
            >
                ← Back
            </button>

            <div style={styles.pageContainer}>
                <CourseDetail course={course} />
            </div>
        </>
    );
}

const styles = {
    backButton: {
        position: 'fixed',
        top: 100,
        left: 230,
        zIndex: 1000,
        cursor: 'pointer',
        backgroundColor: '#357ae8',
        border: 'none',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: 8,
        fontWeight: 600,
        fontSize: '1rem',
        boxShadow: '0 4px 12px rgba(53, 122, 232, 0.6)',
        userSelect: 'none',
        transition: 'background-color 0.3s ease',
    },
    pageContainer: {
        maxWidth: 900,
        margin: '40px auto',
        padding: 24,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#2c3e50',
    },
    notFound: {
        textAlign: 'center',
        marginTop: 60,
        fontSize: '1.25rem',
        color: '#999',
        fontStyle: 'italic',
    },
};