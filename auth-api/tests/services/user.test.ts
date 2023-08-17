import { whoami, getByEmail, getById, signup, update, remove, sanitizeUserResponse, userRepo } from "../../src/services/users";
import { User } from "../../src/models/user";

describe('who am i', () => {
  it('should return a user by user code', async () => {
    const user: User = {
      userId: 1,
      firstName: 'Jane',
      lastName: 'Doe',
      userCode: 'abc123',
      email: 'jane@doe.com',
      password: 'password',
      createdAt: new Date(),
      modifiedAt: new Date(),
      roles: [],
      prepForInsert: function (): Promise<void> {
        throw new Error("Function not implemented.");
      }
    };

    const reqBody = {
      userCode: user.userCode
    };

    userRepo.findOne = jest.fn().mockResolvedValue(user);

    const result = await whoami(reqBody);

    expect(result).toBeDefined();
    expect(result).toEqual(user);
    expect(userRepo.findOne).toHaveBeenCalledWith({
      where: { userCode: user.userCode },
      relations: ['roles', 'roles.permissions'],
    });
  })
})