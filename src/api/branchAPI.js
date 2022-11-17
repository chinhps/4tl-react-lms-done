import axiosClient from './axiosClient';

const branchAPI = {
  getBranch: (slug,table) => {
    let url = `/api/branches?page=${slug}&table=${table}`;
    return axiosClient.get(url);
  },
};

export default branchAPI;
