import apiInstance from './apiConfig';
import { User } from '../interfaces/user';

export const signup = async (userData: Partial<User>) => {
  try {
    const response = await apiInstance.post('/api/users/signup', userData);
    return response.data;
  } catch (error: any) {
    return error.response;
  }
}

export const whoami = async () => {
  try {
    const response = await apiInstance.get('/api/users/whoami')
    return response.data;
  } catch (error: any) {
    return error.response;
  }
}

export const updateUser = async (userData: Partial<User>) => {
  try {
    const response = await apiInstance.put(`api/users`, userData)
    return response.data
  } catch (error: any) {
    return error.response;
  }
}

export const deleteAccount = async () => {
  try {
    const response = await apiInstance.delete('api/users');
    return response.data;
  } catch (error: any) {
    return error.response;
  }
}