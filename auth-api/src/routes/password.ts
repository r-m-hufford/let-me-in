import express, {Request, Response} from "express";
import { confirmNewPassword, hashPassword, validatePassword } from "../../src/services/password";
import { getByUserCode, update } from "../../src/services/users";
import { passwordResetValidation } from "../../src/validators/password-validation";
import { CustomError } from "../../src/middleware/customError";
import { validationResults } from "../../src/utils/validation";

export const passwordRouter = express.Router();

passwordRouter.post('/reset', passwordResetValidation(), async (req: Request, res: Response, next) => {
  try {
    validationResults(req);
    // check old password via normal login flow (can abstract that bit)
    const user = await getByUserCode(req.body.userCode);
    if (!user) throw new CustomError(404, 'user not found');

    const validatedPassword = await validatePassword(req.body.currentPassword, user);
    if (!validatedPassword) throw new CustomError(401, 'something went wrong');

    // make sure new passwords match
    if (!confirmNewPassword(req.body)) throw new CustomError(401, 'passwords do not match');
  
    // hash new password and update
    req.body.password = await hashPassword(req.body.password);
    delete req.body.currentPassword;
    delete req.body.confirmPassword;

    await update(req.body);
    
    //confirm that the new password matches
    const updatedUser = await getByUserCode(req.body.userCode);
    if (!validatePassword(req.body.password, updatedUser)) throw new CustomError(401, 'something went wrong');
    
    return res.status(200).json({ success: true })
  } catch (error) {
    next(error);
  }
})