import apiInstance from './apiConfig';

export const test = async () => {
  const response = await apiInstance.get('/api/test');
  return response.data;
}

export const login = async (credentials: { username: string, password: string }) => {
  const response = await apiInstance.post('/api/auth/login');
  return response.data;
}

// create a userData interface
export const signup = async (userData: any) => {
  const response = await apiInstance.post('/api/users/signup', userData);
  return response.data;
}

export const invalidateToken = async (token: string) => {
  const response = await apiInstance.post('/api/invalidatetokens');
  return response.data;
}