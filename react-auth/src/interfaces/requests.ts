export interface PasswordResetRequest {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}