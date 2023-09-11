import apiInstance from './apiConfig';
import { User } from '../interfaces/user';
import { PasswordResetRequest } from '../interfaces/requests';

interface DeleteRequest {
  password: string;
}

export const login = async (credentials: { email: string, password: string }) => {
  const response = await apiInstance.post('/api/auth/login', credentials);
  return response.data;
}

export const invalidateToken = async () => {
  const response = await apiInstance.post('/api/invalidatetokens');
  return response.data;
}

export const resetPassword = async (passwordResetRequest: PasswordResetRequest) => {
  const response = await apiInstance.post('api/password/reset', passwordResetRequest);
  return response.data;
}