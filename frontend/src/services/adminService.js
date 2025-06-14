import axios from 'axios';

const BASE_URL = '/api/admin';

export function getAllUsers() {
    return axios.get(`${BASE_URL}/users`).then(res => res.data);
}

export function deleteUser(userId) {
    return axios.delete(`${BASE_URL}/users/${userId}`);
}

export function getAllCourses() {
    return axios.get(`${BASE_URL}/courses`).then(res => res.data);
}

export function deleteCourse(courseId) {
    return axios.delete(`${BASE_URL}/courses/${courseId}`);
}

export function createCourse(courseDTO) {
    return axios.post(`${BASE_URL}/courses`, courseDTO).then(res => res.data);
}

// 统一导出，方便整体导入
export default {
    getAllUsers,
    deleteUser,
    getAllCourses,
    deleteCourse,
    createCourse,
};