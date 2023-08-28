import express, { Request, Response } from 'express';
import { User } from '../models/user';
import { myDataSource } from '../../app-data-source';
import { generateTokens } from '../utils/jwt';
import { getById, remove, sanitizeUserResponse, signup, update, whoami } from '../services/users';
import { confirmNewPassword, hashPassword } from '../services/password';

const userRepo = myDataSource.getRepository(User);

export const userRouter = express.Router();

userRouter.get("/whoami", async (req: Request, res: Response) => {
  try {
    const user = await whoami(req.body);
    if (!user) return res.status(404).json({ message: 'user not found' });
    const sanitizedUser = sanitizeUserResponse(user);
    res.status(200).json(sanitizedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'internal server error' });
  }
})
  
userRouter.post("/signup", async (req: Request, res: Response) => {
  try {
    if (!confirmNewPassword(req.body)) return res.status(401).json({ error: 'passwords do not match' })

    req.body.password = await hashPassword(req.body.password);

    const user = await signup(req.body);
    const token = generateTokens(user);
    
    res.status(201).json(
      { success: true,
        token
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'internal server error' });
  }
})

userRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    await update(req.params.id, req.body);

    const user = await getById(req.params.id);
    if (!user) return res.status(404).json({ message: 'user not found' });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'internal server error' });
  }
})

userRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const user = await remove(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'internal server error' });
  }
})