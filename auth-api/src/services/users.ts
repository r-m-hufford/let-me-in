import { myDataSource } from "../../app-data-source";
import { User } from "../models/user";
import { generateTokens } from "../utils/jwt";
const userRepo = myDataSource.getRepository(User);

export async function whoami(reqBody): Promise<Partial<User>> {
  try {
    const user = await userRepo.findOne({ 
      where: {
        userCode: reqBody.userCode
      },
      relations: ['roles', 'roles.permissions']
     });
     const santiziedUser = sanitizeUserResponse(user);
     return santiziedUser;
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

export async function getById(id): Promise<User> {
  try {
    return await userRepo.findOne({ 
       where: {
         userId: id
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
  try {
    return await userRepo.delete(id);
  } catch (error) {
    console.error(error);
  }
}
export async function updateAndReturnUser(id, reqBody) {
  try {
    await update(id, reqBody);
    return await getById(id)
  } catch (error) {
    console.error(error);
  }
}


// remove properties that should not be in the response
function sanitizeUserResponse(user: User): Partial<User> {
  delete user.password;
  delete user.userId;
  return user;
}