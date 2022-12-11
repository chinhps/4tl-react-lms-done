import axiosClient from './axiosClient';

const deadlineConfigAPI = {
  upsert: (body) => {
    const url = '/api/course/deadline/create';
    return axiosClient.post(url, body);
  },
  getOne: (type,slug) => {
    const url = `/api/course/deadline/${type}/${slug}`;
    return axiosClient.get(url);
  },
};
export default deadlineConfigAPI;
