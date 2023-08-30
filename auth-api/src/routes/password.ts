import express, {Request, Response} from "express";
import { confirmNewPassword, hashPassword, validatePassword } from "../../src/services/password";
import { getByUserCode, update } from "../../src/services/users";

export const passwordRouter = express.Router();

passwordRouter.post('/reset', async (req, res) => {
  try {
    // check old password 
    const user = await getByUserCode(req.body.userCode);
    console.log(1)
    if (!user) return res.status(404).json({ message: 'user not found' });
    console.log(2)
    if (!validatePassword(req.body.currentPassword, user)) return res.status(401).json({ message: 'something went wrong' })
    console.log(3)

    // make sure new passwords match
    if (!confirmNewPassword(req.body)) return res.status(401).json({ message: 'passwords do not match' })
    console.log(4)
  
  // hash new password and update
  req.body.password = await hashPassword(req.body.password);
  console.log(5)
  delete req.body.currentPassword;
  delete req.body.confirmPassword;

  await update(req.body);
  console.log(6)
    
    //confirm that the new password matches
    const updatedUser = await getByUserCode(req.body.userCode);
    if (!validatePassword(req.body.password, updatedUser)) return res.status(401).json({ message: 'something went wrong' })
    
    return res.status(200).json({ success: true })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'internal server error' });
  }
  // make sure passwords match
  // find the user

  // hash new passwords etc
  //update password on user record

  // return success or failure
})