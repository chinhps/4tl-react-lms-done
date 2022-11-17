import axiosClient from './axiosClient';

const courseApi = {
  getMyCourse: (limit) => {
    const url = '/api/course/joined?limit=' + limit;
    return axiosClient.get(url);
  },
  joinCourse: (idCourse) => {
    const url = '/api/course/join';
    return axiosClient.post(url, { idCourse });
  },
};

export default courseApi;
