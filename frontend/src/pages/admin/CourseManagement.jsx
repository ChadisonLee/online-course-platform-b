import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CourseList from '../../components/course/CourseList';
import courseService from "../../services/courseService";
import Loading from "../../components/common/Loading";

export default function CourseManagement() {
    const navigate = useNavigate();
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
        <>
            {/* 返回按钮固定在左上角，页面内容外部 */}
            <button
                style={styles.backButton}
                onClick={() => navigate(-1)}
                aria-label="Go back"
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2a75d8'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#357ae8'}
            >
                ← Back
            </button>
            <div style={styles.pageContainer}>
                <h1 style={styles.title}>课程管理</h1>
                <p style={styles.description}>
                    在这里你可以查看、创建、编辑和删除课程信息。
                </p>
                <CourseList courses={courses} />
            </div>
        </>
    );
}

const styles = {
    pageContainer: {
        maxWidth: 900,
        margin: '50px auto',
        padding: 24,
        backgroundColor: '#fff',
        borderRadius: 12,
        boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#2c3e50',
        textAlign: 'center',
    },
    title: {
        fontSize: '2.8rem',
        fontWeight: '700',
        marginBottom: 16,
        userSelect: 'none',
    },
    description: {
        fontSize: '1.2rem',
        color: '#555',
        marginBottom: 32,
    },
};