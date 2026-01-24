import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
  timeout: 20000,
});

export default axiosInstance;
