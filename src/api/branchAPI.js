import axiosClient from './axiosClient';

const BASE_URL = 'branch';
const branchAPI = {
    getBranch: (params) => {
        const url = `${BASE_URL}/${params}`;
        return axiosClient.get(url);
    },
};

export default branchAPI;
