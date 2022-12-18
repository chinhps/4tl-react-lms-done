import axiosClient from './axiosClient';

const chatAPI = {
  sendMessage: (body) => {
    return axiosClient.post('/api/chat/send', body, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  },
  listMessageCourse: (slug) => {
    return axiosClient.get('/api/chat/' + slug);
  },
  myRoom: () => {
    return axiosClient.post('/api/chat/my-room');
  },
};

export default chatAPI;
