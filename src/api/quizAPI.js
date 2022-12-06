import axiosClient from './axiosClient';

const quizAPI = {
  getAll: (slug_course, slug_quiz, password) => {
    const url = '/api/course/quiz';
    return axiosClient.post(url, { slug_course, slug_quiz, password });
  },
};

export default quizAPI;
