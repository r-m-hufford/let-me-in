const jwt = require('jsonwebtoken');
import { User } from "../models/user";

/**
 * 
 * @param user a user object
 * @param expiresIn If this value is a number it will be a seconds count (i.e. 30 = 30 seconds)
 * If this value is a string include time units (i.e. '1 day', '1d', '2 hours', '2h', etc)
 * @param refreshIn same as expiresIn. This value must be greater than expiresIn to be useful
 * @returns a json web token
 */
export function generateToken(user: User, expiresIn: number | string = '1d', refreshIn: number | string = '5d') {
  const accessToken = jwt.sign(
    { email: user.email, user_code: user.userCode, type: 'ACCESS' }, 
    process.env.JWT_PRIVATE_KEY, 
    { expiresIn: expiresIn }
  );

  const refreshToken = jwt.sign(
    { email: user.email, user_code: user.userCode, type: 'REFRESH' }, 
    process.env.JWT_PRIVATE_KEY, 
    { expiresIn: refreshIn }
  );

  return {
    accessToken,
    refreshToken
  };
}