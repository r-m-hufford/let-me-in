import 'dotenv/config';
import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt';
import { myDataSource } from '../../app-data-source';
import { User } from '../models/user';

const jwt = require('jsonwebtoken');
const userRepo = myDataSource.getRepository(User);

export const authRouter = express.Router();

authRouter.post('/login', async (req: Request, res: Response) => {
  console.log('in the auth route');

    const user = await userRepo.findOne({ 
    where: {
      email: req.body.email
    }
   });

   const validatePassword = await bcrypt.compare(req.body.password, user.password);

   const token = generateToken(user);

   res.json({
    validatePassword,
    token
   });
});

authRouter.get('/', (req: Request, res: Response) => {
  res.json('this is the auth route. hot diggity.');
});
