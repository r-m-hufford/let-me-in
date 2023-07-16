import express, { Request, Response } from 'express';
import { User } from '../models/user';
import { myDataSource } from '../../app-data-source';
import { generateToken } from '../utils/jwt';
const userRepo = myDataSource.getRepository(User);

export const userRouter = express.Router();


userRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const user = await userRepo.findOne({ 
      where: {
        userId: parseInt(req.params.id)
      }
     });
  
    if (!user) res.status(404).json({ message: 'user not found' });
    
    res.status(200).json(user);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'internal server error' });
  }
})

userRouter.post("/signup", async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;
  
    let user = new User()
  
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = password;
  
    user = await userRepo.save(user);
  
    const token = generateToken(user, '1h');
  
    res.status(201).json({token});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'internal server error' });
  }
})

userRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const user = await userRepo.update(req.params.id, req.body);

    if (!user) res.status(404).json({ message: 'user not found' });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'internal server error' });
  }
})

userRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const user = await userRepo.delete(req.params.id);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'internal server error' });
  }
})