import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>管理员后台面板</h1>
            <div style={styles.navGrid}>
                <Link to="/admin/users" style={styles.navCard}>
                    <div style={styles.icon}>👥</div>
                    <h2 style={styles.cardTitle}>用户管理</h2>
                    <p style={styles.cardDesc}>查看、编辑和删除用户账号</p>
                </Link>

                <Link to="/admin/courses" style={styles.navCard}>
                    <div style={styles.icon}>📚</div>
                    <h2 style={styles.cardTitle}>课程管理</h2>
                    <p style={styles.cardDesc}>查看、编辑和删除课程信息</p>
                </Link>

                <Link to="/admin/courses/create" style={styles.navCard}>
                    <div style={styles.icon}>➕</div>
                    <h2 style={styles.cardTitle}>新建课程</h2>
                    <p style={styles.cardDesc}>创建新的课程内容</p>
                </Link>

                <Link to="/admin/analytics" style={styles.navCard}>
                    <div style={styles.icon}>📅</div>
                    <h2 style={styles.cardTitle}>时间管理</h2>
                    <p style={styles.cardDesc}>查看课程的时间报告</p>
                </Link>
            </div>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: 900,
        margin: '60px auto',
        padding: '0 24px',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#2c3e50',
        textAlign: 'center',
    },
    title: {
        fontSize: '2.8rem',
        fontWeight: '700',
        marginBottom: 48,
    },
    navGrid: {
        display: 'flex',
        justifyContent: 'center',
        gap: 32,
        flexWrap: 'wrap',
    },
    navCard: {
        flex: '0 1 260px',
        backgroundColor: '#f0f6fb',
        borderRadius: 16,
        padding: '32px 24px',
        color: '#2c3e50',
        textDecoration: 'none',
        boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
    },
    icon: {
        fontSize: '3.5rem',
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: '1.4rem',
        fontWeight: '700',
        marginBottom: 12,
    },
    cardDesc: {
        fontSize: '1rem',
        color: '#555',
        lineHeight: 1.4,
    },
};