// src/services/adminService.js
import axios from 'axios';
import api from "./api";

// 这里写后端接口基础地址，方便切换
const adminApi = axios.create({
    baseURL: 'http://localhost:8080/api/admin', // 请根据后端实际地址修改
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

const TOKEN_KEY = 'token';

// 请求拦截器（保留之前添加的JWT Token逻辑）
adminApi.interceptors.request.use(
    config => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
export function getAllUsers() {
    return adminApi.get('/users').then(res => res.data);
}

export function deleteUser(userId) {
    return adminApi.delete(`/users/${userId}`);
}

export function getCourseById(courseId) {
    return adminApi.get(`/courses/${courseId}`).then(res => res.data);
}

export function deleteCourse(courseId) {
    return adminApi.delete(`/courses/del${courseId}`);
}
export function createCourse(courseDTO) {
    return adminApi.post('/courses/create', courseDTO).then(res => res.data);
}
export function editCourse(courseDTO) {
    return adminApi.put(`/courses/edit`, courseDTO).then(res => res.data);
}

export function getCategory() {
    return adminApi.get('/courses/category').then(res => res.data);
}

export function getTotalEnrollment() {
    return adminApi.get('/courses/enrollment').then(res => res.data);
}

export function getTotalVideo() {
    return adminApi.get('/courses/video').then(res => res.data);
}
// 统一导出，方便整体导入
export default {
    getAllUsers,
    deleteUser,
    getCourseById,
    deleteCourse,
    createCourse,
    editCourse,
    getCategory,
    getTotalEnrollment,
    getTotalVideo,
};