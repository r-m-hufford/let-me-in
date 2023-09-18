import apiInstance from './apiConfig';
import { User } from '../interfaces/user';
import { PasswordResetRequest } from '../interfaces/requests';
import { useError } from '../context/ErrorContext';

// this will need changed so I can control what is exposed
export const login = async (credentials: { email: string, password: string }) => {
  try {
    const response = await apiInstance.post('/api/auth/login', credentials);
    return response.data;
  } catch (error: any) {
    console.log(error.response);
    return error.response;
  }
}

export const invalidateToken = async () => {
  const response = await apiInstance.post('/api/invalidatetokens');
  return response.data;
}

export const resetPassword = async (passwordResetRequest: PasswordResetRequest) => {
  const response = await apiInstance.post('api/password/reset', passwordResetRequest);
  return response.data;
}