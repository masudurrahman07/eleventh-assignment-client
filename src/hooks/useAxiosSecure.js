// src/hooks/useAxiosSecure.js
import { useMemo } from 'react';
import axios from 'axios';

const useAxiosSecure = () => {
  const axiosSecure = useMemo(() => {
    const instance = axios.create({
      baseURL: 'http://localhost:3000',
      headers: { 'Content-Type': 'application/json' },
    });

    // Add token on each request
    instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Auto logout on 401
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
  }, []); // empty deps: instance will be stable across renders

  return axiosSecure;
};

export default useAxiosSecure;
