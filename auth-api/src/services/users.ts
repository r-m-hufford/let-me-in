import { myDataSource } from "../../app-data-source";
import { User } from "../models/user";
const userRepo = myDataSource.getRepository(User);

export async function whoami(reqBody) {
  try {
    const user = await userRepo.findOne({ 
      where: {
        userCode: reqBody.userCode
      },
      relations: ['roles', 'roles.permissions']
     });
     // do not return these properties
     delete user.password;
     delete user.userId;
     return user;
  } catch (error) {
    console.error(error);
  }
}

// create

// update

// delete