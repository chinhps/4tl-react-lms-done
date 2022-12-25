import axiosClient from './axiosClient';

const labAPI = {
  download: (slug) => {
    const url = '/api/course/lab/download/' + slug;
    return axiosClient.post(url, [], { responseType: 'blob' });
  },
  download_all: (slug_course) => {
    const url = '/api/course/lab/download-all/' + slug_course;
    return axiosClient.post(url, [], { responseType: 'blob' });
  },
  getAll: (slug_course, slug_lab, password) => {
    const url = '/api/course/lab';
    return axiosClient.post(url, { slug_course, slug_lab, password });
  },
  createLab: (body) => {
    const url = '/api/course/lab/create';
    return axiosClient.post(url, body);
  },
  delete: (slug) => {
    const url = '/api/course/lab/' + slug;
    return axiosClient.delete(url);
  },
  getOne: (slug) => {
    const url = '/api/course/lab/' + slug;
    return axiosClient.get(url);
  },
  submitLab: (body) => {
    const url = '/api/course/lab/done';

    return axiosClient.post(url, body, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  },
};

export default labAPI;
