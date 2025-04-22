import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api' // Replace with your backend URL
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // Get token from local storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
