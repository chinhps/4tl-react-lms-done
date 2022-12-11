import axiosClient from './axiosClient';

const BASE_URL = '/api/courses';
const coursesAPI = {
  getMyCourse: (limit) => {
    const url = '/api/course/joined?limit=' + limit;
    return axiosClient.get(url);
  },
  getMarkQuiz: (slug) => {
    const url = '/api/course/point-submits/quizs/' + slug;
    return axiosClient.get(url);
  },
  getMarkLab: (slug) => {
    const url = '/api/course/point-submits/labs/' + slug;
    return axiosClient.get(url);
  },
  getDocQuizLab: (slugCourse) => {
    const url = '/api/course/' + slugCourse;
    return axiosClient.get(url);
  },
  getStudents: (slugCourse) => {
    const url = '/api/course/students/' + slugCourse;
    return axiosClient.get(url);
  },
  joinCourse: (idCourse) => {
    const url = '/api/course/join';
    return axiosClient.post(url, { idCourse });
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

export default coursesAPI;
