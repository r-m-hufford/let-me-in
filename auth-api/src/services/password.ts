import bcrypt from 'bcrypt';
import { User } from '../models/user';

//validate password
export async function validatePassword(reqBody, user: User) {
  return await bcrypt.compare(`${reqBody.password}${process.env.AUTH_PEPPER}`, user.password);
}
//hash password
export async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(`${password}${process.env.AUTH_PEPPER}`, salt);
}

//confirm password
export function confirmNewPassword(reqBody): boolean {
  const { password, confirmPassword } = reqBody;
  if (password !== confirmPassword) return true;
  return false;
}