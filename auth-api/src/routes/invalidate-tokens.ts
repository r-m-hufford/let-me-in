import express, { Request, Response } from 'express';
import { RevokedToken } from "../models/revoked-token";
import { myDataSource } from '../../app-data-source';
import { invalidateToken } from '../utils/jwt';
const revokedTokenRepo = myDataSource.getRepository(RevokedToken);
const jwt = require('jsonwebtoken');

export const invalidateTokensRouter = express.Router();

invalidateTokensRouter.post('/', async (req: Request, res: Response) => {
  
  let revokedToken = await invalidateToken(req.header('x-auth-token'));

  res.json(
    {
      message: 'token revoked',
      revokedToken
    }
  )
})