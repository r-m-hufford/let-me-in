import apiInstance from './apiConfig';

export const test = async () => {
  const response = await apiInstance.get('/api/test');
  return response.data;
}

export const login = async (credentials: { email: string, password: string }) => {
  const response = await apiInstance.post('/api/auth/login', credentials);
  return response.data;
}

export const signup = async (userData: any) => {
  const response = await apiInstance.post('/api/users/signup', userData);
  return response.data;
}

export const invalidateToken = async (token: string) => {
  const response = await apiInstance.post('/api/invalidatetokens');
  return response.data;
}

export const whoami = async (userEmail: any) => {
  const response = await apiInstance.get('/api/users/whoami', userEmail)
  return response.data;
}