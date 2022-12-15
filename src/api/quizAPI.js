import axiosClient from './axiosClient';

const quizAPI = {
  getAll: (slug_course, slug_quiz, password) => {
    const url = '/api/course/quiz';
    return axiosClient.post(url, { slug_course, slug_quiz, password });
  },
  getOne: (slug) => {
    const url = '/api/course/quiz/' + slug;
    return axiosClient.get(url);
  },
  createQuiz: (body) => {
    const url = '/api/course/quiz/create';
    return axiosClient.post(url, body);
  },
  delete: (slug) => {
    const url = '/api/course/quiz/' + slug;
    return axiosClient.delete(url);
  },
  submitQuiz: (id_point, listAnswers) => {
    const url = '/api/course/quiz/done';
    return axiosClient.post(url, { id_point, listAnswers });
  },
};

export default quizAPI;
