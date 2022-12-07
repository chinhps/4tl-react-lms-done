import axiosClient from './axiosClient';

const labAPI = {
  getAll: (slug_course, slug_quiz, password) => {
    const url = '/api/course/quiz';
    return axiosClient.post(url, { slug_course, slug_quiz, password });
  },
  submitQuiz: (id_point, listAnswers) => {
    const url = '/api/course/quiz/done';
    return axiosClient.post(url, { id_point, listAnswers });
  },
};

export default labAPI;
