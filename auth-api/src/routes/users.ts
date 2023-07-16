import express, { Request, Response } from 'express';
import { User } from '../models/user';
import { myDataSource } from '../../app-data-source';
import { generateToken } from '../utils/jwt';
const userRepo = myDataSource.getRepository(User);

export const userRouter = express.Router();


userRouter.get("/:id", async (req: Request, res: Response) => {
  const user = await userRepo.findOne({ 
    where: {
      userId: parseInt(req.params.id)
    }
   });

  res.send(user)
})

userRouter.post("/signup", async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  let user = new User()

  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  user.password = password;

  user = await userRepo.save(user);

  const token = generateToken(user);

  res.send({
    user,
    token
  });
})

userRouter.put("/:id", async (req: Request, res: Response) => {
  const user = await userRepo.update(req.params.id, req.body);
  res.send(user);
})

userRouter.delete("/:id", async (req: Request, res: Response) => {
  const user = await userRepo.delete(req.params.id);
  res.send(user);
})