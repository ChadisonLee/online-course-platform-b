import React, { useState, useEffect } from 'react';
import userService from '../../services/userService';
import Loading from '../../components/common/Loading';

export default function Profile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ username: '', email: '' });
    const [message, setMessage] = useState(null);

    useEffect(() => {
        userService.getProfile()
            .then(data => {
                setProfile(data);
                setFormData({ username: data.username, email: data.email });
            })
            .catch(console.error)
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
        <div>
            <h1>Profile</h1>
            {message && <p>{message}</p>}
            {editMode ? (
                <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
                    <div>
                        <label>Username:</label>
                        <input name="username" value={formData.username} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input name="email" type="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
                </form>
            ) : (
                <div>
                    <p><strong>Username:</strong> {profile.username}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <button onClick={() => setEditMode(true)}>Edit Profile</button>
                </div>
            )}
        </div>
    );
}