import bcrypt from 'bcrypt';
import { User } from '../models/user';

export async function validatePassword(reqBody, user: User): Promise<boolean> {
  return await bcrypt.compare(`${reqBody.password}${process.env.AUTH_PEPPER}`, user.password);
}
export async function hashPassword(password): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(`${password}${process.env.AUTH_PEPPER}`, salt);
}

export function confirmNewPassword(reqBody): boolean {
  const { password, confirmPassword } = reqBody;
  return password === confirmPassword;
}