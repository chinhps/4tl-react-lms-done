import axios from 'axios';
import queryString from 'query-string';
import { logOut } from '../utils/auth';

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
        if (err.response.status === 401) {
            logOut();
        }
        throw err;
    },
);

export default axiosClient;
