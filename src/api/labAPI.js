import axiosClient from './axiosClient';

const labAPI = {
  getAll: (slug_course, slug_lab, password) => {
    const url = '/api/course/lab';
    return axiosClient.post(url, { slug_course, slug_lab, password });
  },
  submitLab: (body) => {
    const url = '/api/course/lab/done';

    return axiosClient.post(
      url,
      body,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      },
    );
  },
};

export default labAPI;
