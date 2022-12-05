import axiosClient from './axiosClient';

const BASE_URL = '/api/permission-group';
const permissionGroupAPI = {
  get: () => {
    return axiosClient.get(`${BASE_URL}`);
  },
  new: (data) => {
    return axiosClient.post(`${BASE_URL}/new`, data);
  },
  put: (id, data) => {
    return axiosClient.put(`${BASE_URL}/${id}`, data);
  },
  getById: (id) => {
    return axiosClient.get(`${BASE_URL}/${id}`);
  },
  delete: (id) => {
    return axiosClient.delete(`${BASE_URL}/${id}`);
  },
};

export default permissionGroupAPI;
