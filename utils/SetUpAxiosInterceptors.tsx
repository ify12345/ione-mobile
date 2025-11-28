
import axiosInstance from '@/api/axios';
import { logout } from '@/redux/reducers/auth';
import store from '@/redux/store';

export const setupAxiosInterceptors = () => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error?.response?.status;

      if (status === 401 || status === 403) {
        // Auto logout
        store.dispatch(logout());
      }

      return Promise.reject(error);
    }
  );
};
