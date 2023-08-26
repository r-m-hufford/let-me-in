import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'http://localhost:4000',
})

const getToken = () => {
  return window.localStorage.getItem('accessToken');
}

apiInstance.interceptors.request.use((config) => {
  const token = getToken();
  if  (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
})

export default apiInstance;