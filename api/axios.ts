import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://i-one-server-v1.onrender.com',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
  timeout: 20000,
});

export default axiosInstance;
