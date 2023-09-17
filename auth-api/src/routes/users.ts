import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { generateTokens } from '../utils/jwt';
import { getByUserCode, remove, sanitizeUserResponse, signup, update, whoami } from '../services/users';
import { confirmNewPassword, hashPassword, validatePassword } from '../services/password';
import { signupValidation, updateValidation } from '../../src/validators/user-validation';
import { myDataSource } from '../../app-data-source';
import { CustomError } from '../../src/middleware/customError';

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
  
userRouter.post("/signup", signupValidation() ,async (req: Request, res: Response) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.json({ error: validationErrors.array() });
  }
  
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

userRouter.put("/", updateValidation(), async (req: Request, res: Response, next) => {
  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      throw new CustomError(400, validationErrors.array().map((e) => e.msg));
    }

    await update(req.body);

    // delete req.body.userCode;
    req.body.userCode = 'c9b6d9f1-4ab4-4948-bda0-497d04f76a64';
    const user = await getByUserCode(req.body.userCode);
    console.log({ user })
    if (!user) throw new CustomError(404, 'user not found');

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
})

userRouter.delete("/", async (req: Request, res: Response) => {
  try {
    const user = await getByUserCode(req.body.userCode);

    const roles = await myDataSource
    .createQueryBuilder()
    .delete()
    .from('user_role')
    .where("user_id = :user_id", { user_id: user.userId })
    .execute();
    
    const deletedUser = await remove(req.body.userCode);
    res.status(200).json(deletedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'internal server error' });
  }
})