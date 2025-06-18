import api from './api';

const getCourses = () => {
    return api.get('/courses').then(res => res.data);
};

/**
 * 课程报名（订阅）
 * @param courseId
 * @param {string|number} userId 用户ID
 * @returns {Promise<any>}
 */

const getCourseById = (courseId, userId) => {
    return api.get(`/courses/${courseId}`, { params: { userId } }).then(res => res.data);
};

const enrollmentCourse = (courseId, userId) => {
    return api.post(`/courses/${courseId}/enrollment`, null, {
        params: { userId }  // 通过请求参数传递 userId
    }).then(res => res.data);
};

export function getEnrollmentStatus(userId) {
    return api.get(`/my-courses`, {
        params: { userId }  // 通过请求参数传递 userId
    }).then(res => res.data);
}

const enrollmentCancel = (courseId, userId) => {
    return api.delete(`/my-courses/cancelEnrollment`, {
        params: { userId, courseId } // 注意补充 courseId
    });
};

export default {
    getCourses,
    getCourseById,
    enrollmentCourse,
    getEnrollmentStatus,
    enrollmentCancel,
};