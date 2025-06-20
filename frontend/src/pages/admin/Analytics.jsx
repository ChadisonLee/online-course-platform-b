import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import adminService from "../../services/adminService";
import courseService from "../../services/courseService";

export default function Analytics() {
    const navigate = useNavigate();
    const [userCount, setUserCount] = useState(0);
    const [courseCount, setCourseCount] = useState(null);
    const [totalEnrollment, setTotalEnrollment] = useState(null);
    const [totalVideo, setTotalVideo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        adminService.getAllUsers()
            .then(data => {
                setUserCount(data.length); // 把数量存到状态
            })
            .catch(err => {
                console.error('加载用户失败:', err);
                setUserCount(0);
            })
            .finally(() => setLoading(false));

        courseService.getCourses()
            .then(data => {
                setCourseCount(data.length); // 把数量存到状态
                })
            .catch(err => {
                console.error('加载课程失败:', err);
                setCourseCount(0);
            })
            .finally(() => setLoading(false));

        adminService.getTotalEnrollment()
            .then(data => {
                setTotalEnrollment(data); // 把数量存到状态
            })
            .catch(err => {
                console.error('加载订阅总数失败:', err);
                setTotalEnrollment(0);
            })
            .finally(() => setLoading(false));

        adminService.getTotalVideo()
            .then(data => {
                setTotalVideo(data); // 把数量存到状态
            })
            .catch(err => {
                console.error('加载视频总数失败:', err);
                setTotalVideo(0);
            })
            .finally(() => setLoading(false));
    }, []);

    const data = {
        totalUsers: userCount,
        totalCourses: courseCount,
        totalSubscriptions: totalEnrollment,
        totalVideos: totalVideo,
    };

    return (
        <>
        {/* 返回按钮固定在左上角，页面内容外部 */}
        <button
            style={styles.backButton}
            onClick={() => navigate('/admin')}
            aria-label="Go back"
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2a75d8'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#357ae8'}
        >
            ← Back
        </button>

        <div style={styles.container}>
            <h1 style={styles.title}>平台数据分析</h1>
            <div style={styles.grid}>
                <div style={styles.card}>
                    <h2 style={styles.cardTitle}>总用户数</h2>
                    <p style={styles.cardValue}>{data.totalUsers}</p>
                </div>
                <div style={styles.card}>
                    <h2 style={styles.cardTitle}>总课程数</h2>
                    <p style={styles.cardValue}>{data.totalCourses}</p>
                </div>
                <div style={styles.card}>
                    <h2 style={styles.cardTitle}>累计订阅</h2>
                    <p style={styles.cardValue}>{data.totalSubscriptions}</p>
                </div>
                <div style={styles.card}>
                    <h2 style={styles.cardTitle}>课程视频总数</h2>
                    <p style={styles.cardValue}>{data.totalVideos}</p>
                </div>
            </div>
        </div>
        </>
    );
}

const styles = {
    container: {
        maxWidth: 900,
        margin: '40px auto',
        padding: 24,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: '#fff',
        borderRadius: 12,
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    },
    title: {
        fontSize: '2rem',
        fontWeight: '700',
        marginBottom: 32,
        textAlign: 'center',
        color: '#333',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 24,
    },
    card: {
        backgroundColor: '#f8f9fa',
        borderRadius: 10,
        padding: 24,
        textAlign: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    },
    cardTitle: {
        fontSize: '1.1rem',
        fontWeight: '600',
        marginBottom: 12,
        color: '#555',
    },
    cardValue: {
        fontSize: '2rem',
        fontWeight: '700',
        color: '#357ae8',
    },
};