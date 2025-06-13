import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export default function RegisterForm() {
    const { register } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();
        setError(null);
        try {
            await register({ username, email, password });
            // 注册成功后可以跳转登录或自动登录
        } catch (e) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
            <h2>Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    required
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
                />
            </div>
            <button type="submit" style={{ padding: '0.5rem 1rem' }}>
                Register
            </button>
        </form>
    );
}