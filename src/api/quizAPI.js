import axiosClient from './axiosClient';

const BASE_URL = 'branch/';
const quizAPI = {
    getBranch: (params) => {
        const url = `${BASE_URL}`;
        return axiosClient.get(url, params);
    },
};

export default quizAPI;
