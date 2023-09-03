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
         email: reqBody.email
       }
      });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getByUserCode(userCode): Promise<User> {
  try {
    return await userRepo.findOne({ 
       where: {
         userCode: userCode
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

export async function update(reqBody) {
  try {
    return await userRepo.update({ userCode: reqBody.userCode }, reqBody);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function remove(userCode) {
  try {
    return await userRepo.delete({ userCode: userCode });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// remove properties that should not be in the response
export function sanitizeUserResponse(user: User): Partial<User> {
  delete user.password;
  // delete user.userId;
  return user;
}