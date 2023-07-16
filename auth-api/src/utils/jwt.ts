const jwt = require('jsonwebtoken');
import { User } from "../models/user";

export function generateToken(user: User) {
  return jwt.sign({ email: user.email, id: user.userCode }, process.env.JWT_PRIVATE_KEY);
}