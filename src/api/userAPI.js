import axiosClient from './axiosClient';
const BASE_URL = 'user';
const userAPI = {
  getme: () => {
    const url = `/api/user/get-me`;
    return axiosClient.get(url);
  },
  login: (data) => {
    const url = `/api/auth/login`;
    return axiosClient.post(url, data);
  },
  new: (data) => {
    return axiosClient.post(`${BASE_URL}/new`, data);
  },
};

export default userAPI;
