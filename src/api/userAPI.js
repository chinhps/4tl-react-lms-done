import axiosClient from './axiosClient';

const userAPI = {
    getme: () => {
        const url = `/api/user/get-me`;
        return axiosClient.get(url);
    },
    login: (data) => {
        const url = `/api/auth/login`;
        return axiosClient.post(url, data);
    },
};

export default userAPI;
