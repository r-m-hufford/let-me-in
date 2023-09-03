import 'dotenv/config';
import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { generateTokens } from '../utils/jwt';
import { myDataSource } from '../../app-data-source';
import { User } from '../models/user';
import { validatePassword } from '../services/password';
import { getByEmail } from '../services/users';

const jwt = require('jsonwebtoken');
const userRepo = myDataSource.getRepository(User);

export const authRouter = express.Router();

authRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const user = await getByEmail(req.body);
    if (!user) return res.status(400).json({ error: 'Invalid email or password' })
    
    const validatedPassword = await validatePassword(req.body.password, user);
    if (!validatedPassword) return res.status(400).json({ error: 'Invalid email or password' });
 
    const token = generateTokens(user);
 
    res.status(200).json({
      success: true,
      token
    });
   } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'internal server error' });
   }
});
