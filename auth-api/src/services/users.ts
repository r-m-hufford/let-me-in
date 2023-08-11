import { myDataSource } from "../../app-data-source";
import { User } from "../models/user";
import { generateToken } from "../utils/jwt";
const userRepo = myDataSource.getRepository(User);

export async function whoami(reqBody): Promise<User> {
  try {
    let user = await userRepo.findOne({ 
      where: {
        userCode: reqBody.userCode
      },
      relations: ['roles', 'roles.permissions']
     });
     user = sanitizeUserResponse(user);
     return user;
  } catch (error) {
    console.error(error)
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
    console.error(error)
  }
}

export async function signup(reqBody): Promise<User> {
  try {
    const { firstName, lastName, email, password } = reqBody;
    let user = new User()
  
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = password;
  
    return await userRepo.save(user);
  
  } catch (error) {
    console.error(error);
  }
}

export async function update(id, reqBody) {
  try {
    return await userRepo.update(id, reqBody);
  } catch (error) {
    console.error(error);
  }
}

export async function remove(id) {
  return await userRepo.delete(id);
}

// remove properties that should not be in the response
function sanitizeUserResponse(user: User) {
  delete user.password;
  delete user.userId;
  return user;
}