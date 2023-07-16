import express, { Request, Response } from 'express';
import { User } from '../models/user';
import { myDataSource } from '../../app-data-source';
const userRepo = myDataSource.getRepository(User);

export const userRouter = express.Router();

userRouter.get("/", async (req: Request, res: Response) => {
  const users = await userRepo.find();
  res.send({
    message: 'all the users',
    users: users
  });
})

userRouter.get("/:id", async (req: Request, res: Response) => {
  const user = await userRepo.findOne({ 
    where: {
      userId: parseInt(req.params.id)
    }
   });

  res.send(user)
})

userRouter.post("/", async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, userCode } = req.body;
  const hashedPassword = await User.hashPassword(password);

  const user = new User()

  user.firstName = firstName;
  user.lastName = lastName;
  user.userCode =userCode;
  user.email = email;
  user.password = hashedPassword;

  await userRepo.save(user);

  res.send(user);
})

userRouter.put("/:id", async (req: Request, res: Response) => {
  const user = await userRepo.update(req.params.id, req.body);
  res.send(user);
})

userRouter.delete("/:id", async (req: Request, res: Response) => {
  const user = await userRepo.delete(req.params.id);
  res.send(user);
})