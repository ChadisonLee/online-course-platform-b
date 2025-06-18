import React, { useEffect, useState } from 'react';
import CourseList from '../../components/course/CourseList';
import Loading from '../../components/common/Loading';
import courseService from '../../services/courseService';
import CourseDetail from "../../components/course/CourseDetail";

export default function MyCourses() {
    const [myCourses, setMyCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [manageMode, setManageMode] = useState(false); // 管理模式开关
    const [selectedCourses, setSelectedCourses] = useState(new Set()); // 选中的课程ID集合

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.id) {
            alert('请先登录');
            setLoading(false);
            return;
        }
        courseService.getEnrollmentStatus(user.id)
            .then(courses => setMyCourses(courses))
            .catch(err => {
                console.error('加载我的课程失败:', err);
                setMyCourses([]);
            })
            .finally(() => setLoading(false));
    }, []);

    // 切换管理模式
    const toggleManageMode = () => {
        setManageMode(!manageMode);
        setSelectedCourses(new Set()); // 切换时清空已选
    };

    // 选中/取消选中课程
    const toggleSelectCourse = (courseId) => {
        setSelectedCourses(prev => {
            const newSet = new Set(prev);
            if (newSet.has(courseId)) {
                newSet.delete(courseId);
            } else {
                newSet.add(courseId);
            }
            return newSet;
        });
    };

    // 取消订阅选中课程
    const handleUnsubscribe = () => {
        if (selectedCourses.size === 0) {
            alert('请先选择想要取消订阅的课程');
            return;
        }
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.id) {
            alert('请先登录');
            return;
        }

        Promise.all([...selectedCourses].map(courseId =>
            courseService.enrollmentCancel(courseId, user.id)
        ))
            .then(() => {
                alert('取消订阅成功');
                // 重新加载课程列表
                return courseService.getEnrollmentStatus(user.id);
            })
            .then(courses => {
                setMyCourses(courses);
                setSelectedCourses(new Set());
                setManageMode(false);
            })
            .catch(err => {
                console.error('取消订阅失败:', err);
                alert('取消订阅失败，请稍后重试');
            });
    };

    if (loading) return <Loading />;

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>我的课程</h1>
                <button
                    style={styles.manageButton}
                    onClick={toggleManageMode}
                    aria-label="管理课程"
                >
                    {manageMode ? '退出管理' : '管理课程'}
                </button>
            </div>

            {myCourses.length > 0 ? (
                <CourseList
                    courses={myCourses}
                    selectable={manageMode}
                    selectedCourses={selectedCourses}
                    onToggleSelect={toggleSelectCourse}
                />
            ) : (
                <p style={styles.emptyText}>你还没有订阅任何课程。</p>
            )}

            {manageMode && (
                <button
                    style={styles.unsubscribeButton}
                    onClick={handleUnsubscribe}
                    disabled={selectedCourses.size === 0}
                    aria-label="取消订阅选中课程"
                >
                    取消订阅
                </button>
            )}
        </div>
    );
}

const styles = {
    container: {
        maxWidth: 1000,
        margin: '40px auto',
        padding: '20px 24px',
        backgroundColor: '#f9fafb',
        borderRadius: 12,
        boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#333',
        minHeight: '80vh',
        position: 'relative', // 为绝对定位按钮提供参考
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: '2rem',
        fontWeight: '700',
        color: '#2c3e50',
        borderBottom: '3px solid #357ae8',
        paddingBottom: 8,
    },
    manageButton: {
        padding: '8px 16px',
        fontSize: '1rem',
        borderRadius: 6,
        border: 'none',
        backgroundColor: '#357ae8',
        color: '#fff',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    emptyText: {
        fontSize: '1.1rem',
        color: '#777',
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 60,
    },
    unsubscribeButton: {
        position: 'fixed',
        bottom: 30,
        right: 30,
        backgroundColor: '#f44336',
        color: '#fff',
        border: 'none',
        borderRadius: 50,
        padding: '14px 24px',
        fontWeight: '700',
        fontSize: '1rem',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(244, 67, 54, 0.8)',
        opacity: 1,
        transition: 'opacity 0.3s',
        userSelect: 'none',
        disabled: {
            opacity: 0.5,
            cursor: 'not-allowed',
        }
    },
};