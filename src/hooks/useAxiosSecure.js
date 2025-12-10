
import { useMemo } from 'react';
import axios from 'axios';

const useAxiosSecure = () => {
  const axiosSecure = useMemo(() => {

    const instance = axios.create({
      baseURL: 'http://localhost:3000',
      headers: { 'Content-Type': 'application/json' },});

    instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;},
      (error) => Promise.reject(error));

    
    instance.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        return Promise.reject(err);
      }
    );

    return instance;
  }, []); 

  return axiosSecure;
};

export default useAxiosSecure;
