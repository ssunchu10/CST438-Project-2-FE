import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL.endsWith('/') 
    ? process.env.REACT_APP_BACKEND_URL.slice(0, -1) 
    : process.env.REACT_APP_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(config => {
  if (!config.url.endsWith('/')) {
    config.url = `${config.url}/`;
  }
  return config;
});

export default axiosInstance;