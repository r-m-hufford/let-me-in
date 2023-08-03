import express, { Request, Response } from 'express';
import { RevokedToken } from "../models/revoked-token";
import { myDataSource } from '../../app-data-source';
const revokedTokenRepo = myDataSource.getRepository(RevokedToken);
const jwt = require('jsonwebtoken');

export const invalidateTokensRouter = express.Router();

invalidateTokensRouter.post('/', async (req: Request, res: Response) => {
  const decoded = jwt.decode(req.header('x-auth-token'));
  
  let revokedToken = new RevokedToken();
  revokedToken.token = req.header('x-auth-token');
  revokedToken.iat = new Date(decoded.iat * 1000);
  revokedToken.expiresAt = new Date(decoded.exp * 1000);

  revokedToken = await revokedTokenRepo.save(revokedToken);

  res.json(
    {
      message: 'token revoked',
      revokedToken
    }
  )
})