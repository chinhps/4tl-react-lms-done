import axiosClient from './axiosClient';

const BASE_URL = 'branch';
const branchAPI = {
  getBranch: (params) => {
    let url = '';
    if (params) {
      url = `/api/${BASE_URL}/${params}`;
    } else {
      url = `/api/${BASE_URL}`;
    }
    return axiosClient.get(url);
  },
};

export default branchAPI;
