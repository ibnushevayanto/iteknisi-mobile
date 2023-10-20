import axios from 'axios';
import {BASE_URL} from '../config';

let dataLogin;

export const injectStore = _dataLogin => {
  dataLogin = _dataLogin;
};

axios.interceptors.request.use(
  config => {
    config.baseURL = BASE_URL;
    config.headers.Authorization = `Bearer ${dataLogin?.token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default axios;
