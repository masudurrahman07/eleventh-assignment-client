// src/hooks/useAxiosSecure.js
import axios from 'axios';
import useToken from './useToken';

const useAxiosSecure = () => {
  const [token] = useToken(); // get the JWT token

  const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000', // your backend URL
  });

  // Add token to every request
  axiosSecure.interceptors.request.use(config => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return axiosSecure;
};

export default useAxiosSecure;
