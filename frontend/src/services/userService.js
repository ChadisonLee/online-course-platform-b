import api from './api';

const getProfile = () => {
    return api.get('/users/me').then(res => res.data);
};

const updateProfile = (data) => {
    return api.put(`/users/${data.id}`, data).then(res => res.data);
};

export default {
    getProfile,
    updateProfile,
};