import axiosClient from './axiosClient';

const BASE_URL = '/api/point-submit';
const pointSubmitAPI = {
  export: (type,slugCourse) => {
    const url = `/api/course/point-submits/export/${type}/${slugCourse}`;
    return axiosClient.get(url, { responseType: 'blob' });
  },
  setPointSubmit: (body) => {
    const url = '/api/course/point-submits/mark';
    return axiosClient.post(url, body);
  },
  getOnePointSubmit: (id) => {
    const url = '/api/course/point-submits/' + id;
    return axiosClient.get(url);
  },
  get: () => {
    return axiosClient.get(`${BASE_URL}`);
  },
  getWithoutPaginate: () => {
    return axiosClient.get(`${BASE_URL}/fulllist`);
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

export default pointSubmitAPI;
