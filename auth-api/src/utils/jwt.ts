const jwt = require('jsonwebtoken');
import { User } from "../models/user";

/**
 * 
 * @param user a user object
 * @param expiresIn If this value is a number it will be a seconds count (i.e. 30 = 30 seconds)
 * If this value is a string include time units (i.e. '1 day', '1d', '2 hours', '2h', etc)
 * @returns a json web token
 */
export function generateToken(user: User, expiresIn: number | string = '1d') {
  return jwt.sign(
    { email: user.email, id: user.userCode }, 
    process.env.JWT_PRIVATE_KEY, 
    { expiresIn: expiresIn }
  );
}