import { myDataSource } from "../../app-data-source";
import { User } from "../models/user";
export const userRepo = myDataSource.getRepository(User);

export async function whoami(reqBody): Promise<User> {
  try {
    const user = await userRepo.findOne({ 
      where: {
        userCode: reqBody.userCode
      },
      relations: ['roles', 'roles.permissions']
     });
     return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getByEmail(reqBody): Promise<User> {
  try {
    return await userRepo.findOne({ 
       where: {
         email: reqBody.username
       }
      });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getById(id): Promise<User> {
  try {
    return await userRepo.findOne({ 
       where: {
         userId: id
       }
      });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function signup(reqBody): Promise<User> {
  try {
    delete reqBody.confirmPassword;

    let user = new User()
  
    user = {...reqBody};
  
    return await userRepo.save(user);
  
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function update(id, reqBody) {
  try {
    return await userRepo.update(id, reqBody);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function remove(id) {
  try {
    return await userRepo.delete(id);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// remove properties that should not be in the response
export function sanitizeUserResponse(user: User): Partial<User> {
  delete user.password;
  delete user.userId;
  return user;
}