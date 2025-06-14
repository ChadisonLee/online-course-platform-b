import React from 'react';
import CourseCard from './UserCard';

export default function UserList({ users }) {
    if (!users || users.length === 0) {
        return <p style={styles.emptyText}>No users available.</p>;
    }

    return (
        <div style={styles.gridContainer}>
            {users.map(users => (
                <CourseCard key={users.id} users={users} />
            ))}
        </div>
    );
}

const styles = {
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px',
        width: '100%',
    },
    emptyText: {
        fontStyle: 'italic',
        color: '#999',
        textAlign: 'center',
        width: '100%',
        padding: '40px 0',
        userSelect: 'none',
    },
};