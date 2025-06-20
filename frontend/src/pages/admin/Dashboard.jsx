import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
    return (
        <>
            <div style={styles.container}>
                <h1 style={styles.title}>管理员后台面板</h1>
                <div style={styles.navGrid}>
                    <Link to="/admin/users" className="nav-card" tabIndex={0} aria-label="用户管理">
                        <div className="nav-icon">👥</div>
                        <h2 className="nav-card-title">用户管理</h2>
                        <p className="nav-card-desc">查看 | 删除</p>
                    </Link>

                    <Link to="/admin/courses" className="nav-card" tabIndex={0} aria-label="课程管理">
                        <div className="nav-icon">📚</div>
                        <h2 className="nav-card-title">课程管理</h2>
                        <p className="nav-card-desc">查看 | 编辑 | 删除</p>
                    </Link>

                    <Link to="/admin/analytics" className="nav-card" tabIndex={0} aria-label="平台数据分析">
                        <div className="nav-icon">📅</div>
                        <h2 className="nav-card-title">平台数据分析</h2>
                        <p className="nav-card-desc">查看本平台的数据</p>
                    </Link>
                </div>
            </div>

            <style>{`
        .nav-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 0 1 260px;
          background-color: #f0f6fb;
          border-radius: 16px;
          padding: 32px 24px;
          color: #2c3e50;
          text-decoration: none;
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
          transition:
            transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
            box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1),
            background-color 0.3s ease,
            text-decoration 0.3s ease;
          cursor: pointer;
          user-select: none;
        }
        .nav-card:focus-visible {
          outline: 3px solid #61a0ff;
          outline-offset: 4px;
        }
        .nav-card:hover,
        .nav-card:focus {
          transform: translateY(-8px) scale(1.05);
          box-shadow:
            0 20px 40px rgba(0, 0, 0, 0.15),
            0 30px 60px rgba(0, 0, 0, 0.1);
          background-color: #e8f0fe;
          text-decoration: none; /* 禁止下划线 */
          color: #2c3e50; /* 保持文字颜色一致 */
        }
        /* 禁止悬浮时图标和文字出现下划线 */
        .nav-card:hover .nav-icon,
        .nav-card:hover .nav-card-title,
        .nav-card:hover .nav-card-desc {
          text-decoration: none;
          color: inherit;
        }
        .nav-icon {
          font-size: 3.5rem;
          margin-bottom: 16px;
          user-select: none;
        }
        .nav-card-title {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 12px;
          user-select: none;
        }
        .nav-card-desc {
          font-size: 1rem;
          color: #555;
          line-height: 1.4;
          user-select: none;
        }
      `}</style>
        </>
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
};