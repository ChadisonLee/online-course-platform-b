import React, { useState, useEffect } from 'react';
import userService from '../../services/userService';
import Loading from '../../components/common/Loading';

export default function Profile() {

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ id: '', username: '', email: '' });
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.id) {
            alert('请先登录');
            setLoading(null);
            return;
        }
        userService.getProfile()
            .then(data => {
                setProfile(data);
                setFormData({ username: data.username, id: data.id, email: data.email });
            })
            .catch(err => {
                console.error('加载用户信息失败:', err);
            })
            .finally(() => setLoading(false));
    }, []);

    const handleChange = e => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        userService.updateProfile(formData)
            .then(() => {
                setMessage('Profile updated successfully.');
                setEditMode(false);
                setProfile(formData);
            })
            .catch(() => setMessage('Failed to update profile.'));
    };

    if (loading) return <Loading />;

    return (
        <div style={styles.pageContainer}>
            <h1 style={styles.title}>Profile</h1>

            {message && <p style={styles.message}>{message}</p>}

            {editMode ? (
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label htmlFor="username" style={styles.label}>Username:</label>
                        <input
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            style={styles.input}
                            autoFocus
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="email" style={styles.label}>Email:</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.buttonGroup}>
                        <button type="submit" style={{...styles.button, ...styles.saveButton}}>
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => setEditMode(false)}
                            style={{...styles.button, ...styles.cancelButton}}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                profile ? (
                    <div style={styles.profileInfo}>
                        <p><strong>Username:</strong> {profile.username}</p>
                        <p><strong>UID:</strong> {profile.id}</p>
                        <p><strong>Email:</strong> {profile.email}</p>
                        <button onClick={() => setEditMode(true)} style={styles.editButton}>
                            Edit Profile
                        </button>
                    </div>
                ) : (
                    <p style={{ textAlign: 'center' }}>未加载到用户信息，请重新登录或刷新页面。</p>
                )
            )}
        </div>);
}

const styles = {
    pageContainer: {
        maxWidth: 480,
        margin: '60px auto',
        padding: 32,
        backgroundColor: '#fff',
        borderRadius: 12,
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#2c3e50',
        userSelect: 'none',
    },
    title: {
        fontSize: '2.4rem',
        fontWeight: '700',
        marginBottom: 24,
        textAlign: 'center',
    },
    message: {
        textAlign: 'center',
        marginBottom: 20,
        color: '#27ae60',
        fontWeight: '600',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        marginBottom: 8,
        fontWeight: '600',
        fontSize: '1rem',
    },
    input: {
        padding: '10px 14px',
        fontSize: '1rem',
        borderRadius: 6,
        border: '1.5px solid #ccc',
        outline: 'none',
        transition: 'border-color 0.3s ease',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: 12,
    },
    button: {
        flex: 1,
        padding: '12px 0',
        fontSize: '1rem',
        fontWeight: '700',
        borderRadius: 8,
        cursor: 'pointer',
        border: 'none',
        userSelect: 'none',
        transition: 'background-color 0.3s ease',
    },
    saveButton: {
        backgroundColor: '#3498db',
        color: '#fff',
    },
    cancelButton: {
        backgroundColor: '#bdc3c7',
        color: '#2c3e50',
    },
    profileInfo: {
        fontSize: '1.1rem',
        lineHeight: 1.6,
    },
    editButton: {
        marginTop: 24,
        backgroundColor: '#3498db',
        color: '#fff',
        border: 'none',
        padding: '12px 20px',
        borderRadius: 8,
        fontWeight: '700',
        cursor: 'pointer',
        userSelect: 'none',
        transition: 'background-color 0.3s ease',
    },
};