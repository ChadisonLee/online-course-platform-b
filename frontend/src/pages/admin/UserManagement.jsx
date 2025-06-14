import React, {useEffect, useState} from 'react';
import Loading from "../../components/common/Loading";
import adminService from "../../services/adminService";
import UserList from "../../components/admin/user/UserList";

export default function UserManagement() {

    const [users, viewusers] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        adminService.getAllUsers()
            .then(data => viewusers(data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Loading />;

    return (
        <div style={styles.pageContainer}>
            <h1 style={styles.title}>User Management</h1>
            <p style={styles.description}>Here you can manage users.</p>
            <div>
                {users && users.length > 0 ? (
                    <UserList users={users} />
                ) : (
                    <p style={styles.emptyText}>暂无用户，请添加！</p>
                )}
            </div>

        </div>
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
};