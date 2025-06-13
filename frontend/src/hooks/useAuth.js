import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function useAuth() {
    const { user, login, logout, register } = useContext(AuthContext);
    return { user, login, logout, register };
}