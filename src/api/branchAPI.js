import axiosClient from './axiosClient';
const BASE_URL = '/api/branches';

const branchAPI = {
  getBranch: (slug,table) => {
    let url = `${BASE_URL}?page=${slug}&table=${table}`;
    return axiosClient.get(url);
  },
  new: (data) => {
    return axiosClient.post(`${BASE_URL}/new`, data);
  },
  put: (id, data) => {
    return axiosClient.put(`${BASE_URL}/${id}`, data);
  },
  getBySlug: (slug) => {
    return axiosClient.get(`${BASE_URL}/${slug}`);
  },
};

export default branchAPI;
