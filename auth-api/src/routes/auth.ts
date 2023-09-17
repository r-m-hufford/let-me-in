import 'dotenv/config';
import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { generateTokens } from '../utils/jwt';
import { myDataSource } from '../../app-data-source';
import { User } from '../models/user';
import { validatePassword } from '../services/password';
import { getByEmail } from '../services/users';
import { CustomError } from '../../src/middleware/customError';

export const authRouter = express.Router();

authRouter.post('/login', async (req: Request, res: Response, next) => {
  try {
    const user = await getByEmail(req.body);
    if (!user) throw new CustomError(400, 'Invalid email or password');
    
    const validatedPassword = await validatePassword(req.body.password, user);
    if (!validatedPassword) throw new CustomError(400, 'Invalid email or password');
 
    const token = generateTokens(user);
 
    res.status(200).json({
      success: true,
      token
    });
   } catch (error) {
    console.error(error);
    next(error);
   }
});
