import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import UserHome from './pages/user/Home';
import UserCourses from './pages/user/Courses';
import UserMyCourses from './pages/user/MyCourses';
import UserProfile from './pages/user/Profile';
import UserCourseDetail from './pages/user/CourseDetail';

import AdminDashboard from './pages/admin/Dashboard';
import AdminCourseManagement from './pages/admin/CourseManagement';
import AdminCourseEdit from './pages/admin/CourseEdit';
import AdminUserManagement from './pages/admin/UserManagement';
import AdminAnalytics from './pages/admin/Analytics';

function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <Router>
                    <Header />
                    <div style={{ display: 'flex', minHeight: 'calc(100vh - 120px)' }}>
                        <Sidebar />
                        <main style={{ flex: 1, padding: '1rem' }}>
                            <Routes>
                                {/* Auth */}
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />

                                {/* User */}
                                <Route path="/" element={<UserHome />} />
                                <Route path="/courses" element={<UserCourses />} />
                                <Route path="/my-courses" element={<UserMyCourses />} />
                                <Route path="/profile" element={<UserProfile />} />
                                <Route path="/courses/:id" element={<UserCourseDetail />} />

                                {/* Admin */}
                                <Route path="/admin" element={<AdminDashboard />} />
                                <Route path="/admin/courses" element={<AdminCourseManagement />} />
                                <Route path="/admin/courses/edit" element={<AdminCourseEdit />} />
                                <Route path="/admin/users" element={<AdminUserManagement />} />
                                <Route path="/admin/analytics" element={<AdminAnalytics />} />
                            </Routes>
                        </main>
                    </div>
                </Router>
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;