import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from "../../components/common/Loading";
import adminService from "../../services/adminService";
import UserList from "../../components/admin/user/UserList";

export default function UserManagement() {
    const navigate = useNavigate();
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        adminService.getAllUsers()
            .then(data => setUsers(data))
            .catch(err => {
                console.error('加载用户失败:', err);
                setUsers([]);
            })
            .finally(() => setLoading(false));
    }, []);

    const handleDeleteUser = (userId) => {
        if (!window.confirm('确定删除该用户吗？')) return;
        console.log('删除用户:', userId);
        adminService.deleteUser(userId)
            .then(() => {
                alert('用户已删除');
                // 本地状态移除已删除用户，实现刷新效果
                setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
            })
            .catch(err => {
                console.error('删除用户失败:', err);
                alert('删除失败，请稍后重试');
            });
    };

    if (loading) return <Loading />;

    return (
        <>
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
                <h1 style={styles.title}>User Management</h1>
                <p style={styles.description}>Here you can manage users.</p>
                <div>
                    {users && users.length > 0 ? (
                        <UserList users={users} onDeleteUser={handleDeleteUser} />
                    ) : (
                        <p style={styles.emptyText}>暂无用户，请添加！</p>
                    )}
                </div>
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
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
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
    emptyText: {
        fontStyle: 'italic',
        color: '#999',
        userSelect: 'none',
    },
};