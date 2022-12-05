import axiosClient from './axiosClient';

const quizAPI = {
  getAll: (slug_course,slug_quiz) => {
    const url = '/api/course/quiz';
    return axiosClient.get(url,{ params: { slug_course,slug_quiz } });
  }
};

export default quizAPI;
