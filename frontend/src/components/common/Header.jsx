import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

export default function Header() {
    const { user, logout } = useContext(AuthContext);

    return (
        <header style={{ padding: '1rem', background: '#282c34', color: '#fff' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
                <Link to="/" style={{ color: '#61dafb', fontWeight: 'bold', fontSize: '1.5rem', textDecoration: 'none' }}>
                    Online Course Platform
                </Link>
                <nav>
                    {user ? (
                        <>
                            <Link to="/profile" style={{ color: '#fff', marginRight: '1rem' }}>
                                {user.username}
                            </Link>
                            <button onClick={logout} style={{ cursor: 'pointer' }}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={{ color: '#fff', marginRight: '1rem' }}>
                                Login
                            </Link>
                            <Link to="/register" style={{ color: '#fff' }}>
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}