import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

export default function Header() {
    const { user, logout } = useContext(AuthContext);

    return (
        <header style={styles.header}>
            <div style={styles.container}>
                <Link to="/" style={styles.logo}>
                    Online Course Platform
                </Link>
                <nav style={styles.nav}>
                    {user ? (
                        <>
                            <Link to="/profile" style={styles.userName}>
                                {user.username}
                            </Link>
                            <button onClick={logout} style={styles.logoutButton} aria-label="Logout">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={styles.link}>
                                Login
                            </Link>
                            <Link to="/register" style={{ ...styles.link, marginLeft: 16 }}>
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}

const styles = {
    header: {
        padding: '1rem 0',
        backgroundColor: '#20232a',
        color: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
    },
    container: {
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        color: '#61dafb',
        fontWeight: '700',
        fontSize: '1.75rem',
        textDecoration: 'none',
        userSelect: 'none',
        transition: 'color 0.3s ease',
    },
    nav: {
        display: 'flex',
        alignItems: 'center',
    },
    userName: {
        color: '#fff',
        marginRight: 20,
        fontWeight: '600',
        fontSize: '1rem',
        textDecoration: 'none',
        userSelect: 'none',
        transition: 'color 0.3s ease',
    },
    link: {
        color: '#fff',
        fontWeight: '500',
        fontSize: '1rem',
        textDecoration: 'none',
        userSelect: 'none',
        padding: '6px 12px',
        borderRadius: 6,
        transition: 'background-color 0.3s ease, color 0.3s ease',
    },
    logoutButton: {
        backgroundColor: '#e53e3e',
        border: 'none',
        color: '#fff',
        padding: '8px 16px',
        fontWeight: '600',
        fontSize: '1rem',
        borderRadius: 6,
        cursor: 'pointer',
        userSelect: 'none',
        transition: 'background-color 0.3s ease',
    },
};