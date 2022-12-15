import axiosClient from './axiosClient';
const BASE_URL = '/api/dashboard';

const dashboardAPI = {
  getAll: () => {
    const url = BASE_URL;
    return axiosClient.get(url);
  },
};

export default dashboardAPI;
