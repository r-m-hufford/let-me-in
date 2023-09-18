import express, { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { generateTokens } from '../utils/jwt';
import { getByUserCode, remove, sanitizeUserResponse, signup, update, whoami } from '../services/users';
import { confirmNewPassword, hashPassword, validatePassword } from '../services/password';
import { signupValidation, updateValidation } from '../../src/validators/user-validation';
import { myDataSource } from '../../app-data-source';
import { CustomError } from '../../src/middleware/customError';
import { validationResults } from '../../src/utils/validation';

export const userRouter = express.Router();

userRouter.get("/whoami", async (req: Request, res: Response, next) => {
  try {
    const user = await whoami(req.body);
    if (!user) throw new CustomError(404, 'user not found');
    const sanitizedUser = sanitizeUserResponse(user);
    res.status(200).json(sanitizedUser);
  } catch (error) {
    next(error);
  }
})
  
userRouter.post("/signup", signupValidation() ,async (req: Request, res: Response, next) => {
  try {
    validationResults(req);

    if (!confirmNewPassword(req.body)) throw new CustomError(400, 'passwords do not match');

    req.body.password = await hashPassword(req.body.password);

    const user = await signup(req.body);
    const token = generateTokens(user);
    
    res.status(201).json(
      { success: true,
        token
      }
    );
  } catch (error) {
    next(error);
  }
})

userRouter.put("/", updateValidation(), async (req: Request, res: Response, next) => {
  try {
    validationResults(req);

    await update(req.body);

    const user = await getByUserCode(req.body.userCode);
    if (!user) throw new CustomError(404, 'user not found');

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
})

userRouter.delete("/", async (req: Request, res: Response, next) => {
  try {
    const user = await getByUserCode(req.body.userCode);
    if (!user) throw new CustomError(404, 'user not found');


    const roles = await myDataSource
    .createQueryBuilder()
    .delete()
    .from('user_role')
    .where("user_id = :user_id", { user_id: user.userId })
    .execute();
    
    const deletedUser = await remove(req.body.userCode);
    res.status(200).json(deletedUser);
  } catch (error) {
    next(error)
  }
})