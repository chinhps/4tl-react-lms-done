import axiosClient from './axiosClient';

const fileAPI = {
  fetchDownload: (url) => {
    return axiosClient.get(url, [], {
        headers: {
          'content-type': 'application/octet-stream',
        },
      });
  },
};

export default fileAPI;
