import axios from 'axios';
import queryString from 'query-string';
import { API } from '../Constant';

const axiosClient = axios.create({
    baseURL: API,
    headers: {
        'content-type': 'application/json',
    },
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
        throw err;
    },
);

export default axiosClient;
