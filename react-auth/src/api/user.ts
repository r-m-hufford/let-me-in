import apiInstance from './apiConfig';
import { User } from '../interfaces/user';

interface DeleteRequest {
  password: string;
}
export const signup = async (userData: Partial<User>) => {
  const response = await apiInstance.post('/api/users/signup', userData);
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

export const deleteAccount = async () => {
  const response = await apiInstance.delete('api/users');
  return response.data;
}