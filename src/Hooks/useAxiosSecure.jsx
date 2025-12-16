import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import useAuth from './useAuth';

const axiosSecure = axios.create({
  baseURL: 'https://e-tuition-bd-server.vercel.app',
});

const useAxiosSecure = () => {
  const { user, loading, signOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          const token = await user?.getIdToken(true); 
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          signOutUser();
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, loading, navigate, signOutUser]);

  return axiosSecure;
};

export default useAxiosSecure;