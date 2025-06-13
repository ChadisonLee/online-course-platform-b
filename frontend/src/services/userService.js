import api from './api';

const getProfile = () => {
    return api.get('/users/profile').then(res => res.data);
};

const updateProfile = (data) => {
    return api.put('/users/profile', data).then(res => res.data);
};

export default {
    getProfile,
    updateProfile,
};