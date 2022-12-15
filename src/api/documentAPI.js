import axiosClient from './axiosClient';

const documentAPI = {
  createDocument: (formData) => {
    const url = '/api/course/document/create';
    return axiosClient.post(url, formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  },
  getOne: (slug) => {
    const url = '/api/course/document/' + slug;
    return axiosClient.get(url);
  },
  delete: (slug) => {
    const url = '/api/course/document/' + slug;
    return axiosClient.delete(url);
  },
};
export default documentAPI;
