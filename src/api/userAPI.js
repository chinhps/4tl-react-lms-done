import axiosClient from './axiosClient';

const BASE_URL = 'users';
const userAPI = {
    getme: () => {
        const url = `${BASE_URL}/get-me`;
        return axiosClient.get(url);
    },
};

export default userAPI;
