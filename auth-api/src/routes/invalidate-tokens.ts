import express, { Request, Response } from 'express';
import { RevokedTokens } from "../models/revoked-token";
import { myDataSource } from '../../app-data-source';
const revokedTokenRepo = myDataSource.getRepository(RevokedTokens);

export const invalidateTokensRouter = express.Router();

invalidateTokensRouter.post('/',async (req: Request, res: Response) => {
  console.log('invalidate tokens route');
  console.log(req.headers);

  res.json(
    {
      message: 'this was a token route'
    }
  )
})