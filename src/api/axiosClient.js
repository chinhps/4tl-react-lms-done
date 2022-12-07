import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import queryString from 'query-string';
import { logOut } from '../utils/auth';
import { createStandaloneToast } from '@chakra-ui/toast';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'content-type': 'application/json',
  },
  withCredentials: true,
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.response.use(
  (res) => {
    if (res && res.data) {
      return res.data;
    }
    return res;
  },
  (err) => {
    if (err.response.status === 403) {
      const { toast } = createStandaloneToast();
      toast({
        title: 'Thông báo!',
        description: err.response.data.msg,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    if (err.response.status === 401) {
      logOut();
    }
    throw err;
  },
);

export default axiosClient;
