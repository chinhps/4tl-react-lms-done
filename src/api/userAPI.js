import axiosClient from './axiosClient';
const BASE_URL = '/api/users';
const userAPI = {
  getme: () => {
    const url = `/api/user/get-me`;
    return axiosClient.get(url);
  },
  changePassword: (password_old, password) => {
    const url = `/api/user/change-password`;
    return axiosClient.put(url, { password_old, password });
  },
  login: (data) => {
    const url = `/api/auth/login`;
    return axiosClient.post(url, data);
  },
  urlLoginGoogle: () => {
    const url = `/api/auth/get-google-sign-in-url`;
    return axiosClient.post(url);
  },
  loginWithGoogle: (code) => {
    const url = `/api/auth/callback?code=${code}`;
    return axiosClient.get(url);
  },
  get: () => {
    return axiosClient.get(`${BASE_URL}`);
  },
  new: (data) => {
    return axiosClient.post(`${BASE_URL}/new`, data);
  },
  put: (id, data) => {
    return axiosClient.put(`${BASE_URL}/${id}`, data);
  },
  getTeacher: () => {
    return axiosClient.get(`${BASE_URL}/get-teacher`);
  },
  getById: (id) => {
    return axiosClient.get(`${BASE_URL}/${id}`);
  },
  delete: (id) => {
    return axiosClient.delete(`${BASE_URL}/${id}`);
  },
};
export default userAPI;
