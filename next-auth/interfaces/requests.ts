export interface PasswordResetRequest {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}