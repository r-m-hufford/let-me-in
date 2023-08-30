import apiInstance from './apiConfig';
import { User } from '../interfaces/user';

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

export const invalidateToken = async (token: string) => {
  const response = await apiInstance.post('/api/invalidatetokens');
  return response.data;
}

export const whoami = async (userEmail: any) => {
  const response = await apiInstance.get('/api/users/whoami', userEmail)
  return response.data;
}

export const updateUser = async (userData: Partial<User>) => {
  // get the userId
  // make this a util
  // let user;
  // const rawUser = window.localStorage.getItem('user');
  // if (rawUser) user = JSON.parse(rawUser);
  // console.log(user.userId);
  // concat it into the url
  const response = await apiInstance.put(`api/users`, userData)
  return response.data
}