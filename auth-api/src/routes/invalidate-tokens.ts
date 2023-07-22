import express, { Request, Response } from 'express';
import { RevokedTokens } from "../models/revoked-token";
import { myDataSource } from '../../app-data-source';
const revokedTokenRepo = myDataSource.getRepository(RevokedTokens);
const jwt = require('jsonwebtoken');

export const invalidateTokensRouter = express.Router();

invalidateTokensRouter.post('/', async (req: Request, res: Response) => {
  console.log('invalidate tokens route');
  console.log(req.headers);
  
  const decoded = jwt.decode(req.header('x-auth-token'));
  
  console.log('decoded: ', decoded);
  let revokedToken = new RevokedTokens();
  revokedToken.token = req.header('x-auth-token');
  revokedToken.iat = new Date(decoded.iat * 1000);
  revokedToken.expiresAt = new Date(decoded.exp * 1000);

  revokedToken = await revokedTokenRepo.save(revokedToken);

  res.json(
    {
      message: 'this was a token route',
      revokedToken
    }
  )
})