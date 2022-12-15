import axiosClient from './axiosClient';

const chatAPI = {
  sendMessage: (slug, message) => {
    return axiosClient.post('/api/chat/send', { slug, message });
  },
  listMessageCourse: (slug) => {
    return axiosClient.get('/api/chat/' + slug);
  },
  myRoom: () => {
    return axiosClient.post('/api/chat/my-room');
  },
};

export default chatAPI;
