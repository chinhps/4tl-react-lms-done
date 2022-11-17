import axiosClient from './axiosClient';

const newsAPI = {
  getAll: (limit) => {
    const url = '/api/news?limit=' + limit;
    return axiosClient.get(url);
  }
};

export default newsAPI;
