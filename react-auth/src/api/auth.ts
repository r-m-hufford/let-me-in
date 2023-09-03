import apiInstance from './apiConfig';
import { User } from '../interfaces/user';
import { PasswordResetRequest } from '../interfaces/requests';
export const test = async () => {
  const response = await apiInstance.get('/api/test');
  return response.data;
}

export const login = async (credentials: { email: string, password: string }) => {
  const response = await apiInstance.post('/api/auth/login', credentials);
  return response.data;
}

export const signup = async (userData: Partial<User>) => {
  const response = await apiInstance.post('/api/users/signup', userData);
  return response.data;
}

export const invalidateToken = async () => {
  const response = await apiInstance.post('/api/invalidatetokens');
  return response.data;
}

export const whoami = async () => {
  const response = await apiInstance.get('/api/users/whoami')
  return response.data;
}

export const updateUser = async (userData: Partial<User>) => {
  const response = await apiInstance.put(`api/users`, userData)
  return response.data
}

export const resetPassword = async (passwordResetRequest: PasswordResetRequest) => {
  const response = await apiInstance.post('api/password/reset', passwordResetRequest);
  return response.data;
}

export const deleteAccount = async () => {
  const response = await apiInstance.delete('api/users');
  return response.data;
}