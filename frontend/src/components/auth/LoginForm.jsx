import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import {useLocation, useNavigate} from "react-router-dom";

export default function LoginForm() {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        setError(null);
        try {
            await login(username, password);
            navigate('/');
            window.location.reload();
        } catch (e) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
            <h2>Login</h2>
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
                Login
            </button>
        </form>
    );
}