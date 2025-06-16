import React from 'react';
import UserCard from './UserCard';

export default function UserList({ users, onDeleteUser }) {
    if (!users || users.length === 0) {
        return <p style={styles.emptyText}>暂无用户</p>;
    }

    return (
        <div style={styles.gridContainer}>
            {users.map(user => (
                <UserCard key={user.id} user={user} onDelete={onDeleteUser} />
            ))}
        </div>
    );
}

const styles = {
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))',
        gap: '24px',
        width: '100%',
    },
    emptyText: {
        fontStyle: 'italic',
        color: '#999',
        textAlign: 'center',
        padding: '40px 0',
        userSelect: 'none',
    },
};