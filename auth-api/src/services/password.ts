import bcrypt from 'bcrypt';

//validate password
export async function validatePassword() {
  return 'woah';
}
//hash password
export async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

//confirm password
export function confirmNewPassword() {
  return 'wowey';
}