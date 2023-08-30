import express, {Request, Response} from "express";
import { confirmNewPassword, hashPassword, validatePassword } from "../../src/services/password";
import { getByUserCode, update } from "../../src/services/users";
import { passwordResetValidation } from "../../src/validators/password-validation";
import { validationResult } from "express-validator";

export const passwordRouter = express.Router();

passwordRouter.post('/reset', passwordResetValidation(), async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.json({ error: validationErrors.array() });
  }
  try {
    // check old password via normal login flow (can abstract that bit)
    const user = await getByUserCode(req.body.userCode);
    if (!user) return res.status(404).json({ error: 'user not found' });

    const validatedPassword = await validatePassword(req.body.currentPassword, user);
    if (!validatedPassword) return res.status(401).json({ error: 'something went wrong' })

    // make sure new passwords match
    if (!confirmNewPassword(req.body)) return res.status(401).json({ error: 'passwords do not match' })
  
    // hash new password and update
    req.body.password = await hashPassword(req.body.password);
    delete req.body.currentPassword;
    delete req.body.confirmPassword;

    await update(req.body);
    
    //confirm that the new password matches
    const updatedUser = await getByUserCode(req.body.userCode);
    if (!validatePassword(req.body.password, updatedUser)) return res.status(401).json({ error: 'something went wrong' })
    
    return res.status(200).json({ success: true })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'internal server error' });
  }
})