
import axios from 'axios';

const API_BASE_URL = 'https://silent-fire-27c2.sguerrero-sgc.workers.dev';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para añadir el token a cada petición
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;
