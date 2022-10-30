import axiosClient from './axiosClient';

const BASE_URL = 'course/join';
const courseStudentAPI = {
    post: (id, data) => {
        const url = `${BASE_URL}/${id}`;
        return axiosClient.post(url, data);
    },
};

export default courseStudentAPI;
