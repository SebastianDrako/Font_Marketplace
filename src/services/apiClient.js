
import axios from 'axios';

// Define the base URL for the API
const API_BASE_URL = 'https://api.example.com/api'; // Reemplaza esto con la URL de tu API

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
