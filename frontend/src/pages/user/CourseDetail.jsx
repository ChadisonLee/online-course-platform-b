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
    const [subscribed, setSubscribed] = useState(false);
    const [subscribing, setSubscribing] = useState(false); // 订阅中状态，防止重复点击

    // 加载课程详情，初始化订阅状态
    const loadCourse = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        setLoading(true);
        courseService.getCourseById(id, user?.id)
            .then(data => {
                if (data) {
                    setCourse(data);
                    console.log('Course enrolled:', data.enrolled);
                    setSubscribed(Boolean(data.enrolled)); // 后端 DTO 带 enrolled 字段
                } else {
                    setCourse(null);
                    setSubscribed(false);
                }
            })
            .catch(error => {
                console.error('加载课程失败:', error);
                setCourse(null);
                setSubscribed(false);
            })
            .finally(() => setLoading(false));
    };


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        setLoading(true);

        courseService.getCourseById(id, user?.id)
            .then(data => {
                setCourse(data);
                setSubscribed(Boolean(data.enrolled)); // 后端返回的报名状态
            })
            .catch(err => {
                console.error('加载课程失败:', err);
                setCourse(null);
                setSubscribed(false);
            })
            .finally(() => setLoading(false));
    }, [id]);

// 订阅按钮逻辑
    const handleSubscribe = () => {
        if (subscribed || subscribing) return; // 防止重复点击

        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.id) {
            alert('请先登录');
            return;
        }

        setSubscribing(true);

        courseService.enrollmentCourse(id, user.id)
            .then(() => {
                alert('订阅成功！');
                loadCourse(); // 重新拉取课程，更新订阅状态
            })
            .catch(error => {
                console.error('订阅失败:', error);
                alert('订阅失败，请稍后重试');
            })
            .finally(() => setSubscribing(false));
    };

    if (loading) return <Loading />;
    if (!course) return <p style={styles.notFound}>Course not found.</p>;

    return (
        <>
            {/* 返回按钮 */}
            <button
                style={styles.backButton}
                onClick={() => navigate(-1)}
                aria-label="Go back"
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2a75d8'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#357ae8'}
            >
                ← Back
            </button>

            {/* 订阅按钮 */}
            <button
                style={{
                    ...styles.subscribeButton,
                    cursor: subscribed || subscribing ? 'default' : 'pointer',
                    ...(subscribed ? styles.subscribeButtonSubscribed : styles.subscribeButtonUnsubscribed),
                    opacity: subscribing ? 0.7 : 1,
                }}
                onClick={handleSubscribe}
                disabled={subscribed || subscribing}
                aria-label={subscribed ? 'Subscribed' : 'Subscribe to course'}
            >
                {subscribed ? '已订阅' : (subscribing ? '订阅中...' : '订阅')}
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
    subscribeButton: {
        position: 'fixed',
        top: 100,
        left: 330,
        zIndex: 1000,
        borderRadius: 8,
        color: '#fff',
        padding: '10px 20px',
        fontSize: '1rem',
        userSelect: 'none',
        transition: 'all 0.3s ease',
    },
    subscribeButtonSubscribed: {
        backgroundColor: '#2196f3',
        boxShadow: '0 4px 12px rgba(33, 150, 243, 0.8)',
        fontWeight: 600,
        cursor: 'default',
    },
    subscribeButtonUnsubscribed: {
        backgroundColor: '#f44336',
        boxShadow: '0 4px 12px rgba(244, 67, 54, 0.6)',
        fontWeight: 600,
        cursor: 'pointer',
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