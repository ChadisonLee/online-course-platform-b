import api from './api';

const getCourses = () => {
    return api.get('/courses').then(res => res.data);
};

const getCourseById = (id) => {
    return api.get(`/courses/${id}`).then(res => res.data);
};

export default {
    getCourses,
    getCourseById,
};