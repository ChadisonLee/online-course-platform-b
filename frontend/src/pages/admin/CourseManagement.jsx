import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseList from '../../components/admin/course/CourseList';
import courseService from "../../services/courseService";
import Loading from "../../components/common/Loading";
import adminService from "../../services/adminService";

export default function CourseManagement() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState(null);
    const [loading, setLoading] = useState(true);

    // 加载课程列表
    const loadCourses = () => {
        setLoading(true);
        courseService.getCourses()
            .then(data => setCourses(data))
            .catch(err => {
                console.error('加载课程失败:', err);
                setCourses([]);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadCourses();
    }, []);

    // 删除课程处理
    const handleDeleteCourse = (courseId) => {
        if (!window.confirm('确定删除该课程吗？')) return;

        adminService.deleteCourse(courseId)
            .then(() => {
                alert('课程已删除');
                loadCourses();
            })
            .catch(err => {
                console.error('删除课程失败:', err);
                alert('删除失败，请稍后重试');
            });
    };

    // 编辑课程处理，跳转编辑页面；courseId 为 undefined 表示新建
    const handleEditCourse = (courseId) => {
        if (courseId) {
            navigate(`/admin/courses/edit`, { state: { courseId } });
        } else {
            navigate(`/admin/courses/edit`);
        }
    };

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
                {/* 右上角创建课程按钮 */}
                <button
                    type="button"
                    style={styles.createButton}
                    onClick={() => handleEditCourse()}
                    aria-label="创建新课程"
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2a75d8'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#357ae8'}
                >
                    + 创建课程
                </button>

                <h1 style={styles.title}>课程管理</h1>
                <p style={styles.description}>
                    在这里你可以查看、创建、编辑和删除课程信息。
                </p>
                <CourseList
                    courses={courses}
                    onDeleteCourse={handleDeleteCourse}
                    onEditCourse={handleEditCourse}
                />
            </div>
        </>
    );
}

const styles = {
    pageContainer: {
        position: 'relative', // 使创建按钮绝对定位相对该容器
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
    createButton: {
        position: 'absolute',
        top: 24,
        right: 24,
        backgroundColor: '#357ae8',
        border: 'none',
        color: '#fff',
        padding: '10px 18px',
        borderRadius: 8,
        fontWeight: '700',
        fontSize: '1rem',
        cursor: 'pointer',
        userSelect: 'none',
        transition: 'background-color 0.3s ease',
        zIndex: 10,
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