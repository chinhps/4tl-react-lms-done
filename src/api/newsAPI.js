import axiosClient from './axiosClient';
const BASE_URL = '/api/news';

const newsAPI = {
  getAll: (limit) => {
    const url = '/api/news?limit=' + limit;
    return axiosClient.get(url);
  },
  get: () => {
    return axiosClient.get(`${BASE_URL}`);
  },
  upsert: (data) => {
    return axiosClient.post(`${BASE_URL}/new`, data, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  },
  getById: (id) => {
    return axiosClient.get(`${BASE_URL}/${id}`);
  },
  delete: (id) => {
    return axiosClient.delete(`${BASE_URL}/${id}`);
  },
};

export default newsAPI;
