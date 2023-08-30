import { whoami, getByEmail, getByUserCode, signup, update, remove, sanitizeUserResponse, userRepo } from "../../src/services/users";
import { User } from "../../src/models/user";
import { getTestNewUser, getTestSanitizedUser, getTestUser } from "../test-helpers/users";

describe('who am i', () => {
  it('should return a user by user code', async () => {
    const user: User = getTestUser();

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

  it('should handle whoami search errors', async () => {
    const user = getTestUser();
    const searchError = new Error('Search Error');

    userRepo.findOne = jest.fn().mockRejectedValue(searchError);

    await expect(whoami(user)).rejects.toThrow(searchError);
  })
})

// describe get by email
describe('get by email', () => {
  it('should return a single user', async () => {
    // get test user
    const user = getTestUser();
    const reqBody = { email: 'jane@doe.com' }

    // mock the db logic
    userRepo.findOne = jest.fn().mockResolvedValue(user);

    const result = await getByEmail(reqBody);

    expect(result).toBeDefined();
    expect(result).toEqual(user);
    expect(userRepo.findOne).toHaveBeenCalledWith({
      where: { email: user.email }
    })
  })

  it('should handle email search errors', async () => {
    const user = getTestUser();
    const searchError = new Error('Search Error');

    userRepo.findOne = jest.fn().mockRejectedValue(searchError);

    await expect(getByEmail(user)).rejects.toThrow(searchError);
  })
})

describe('get by id', () => {
  it('should return a single user', async () => {
    const user = getTestUser();
    const userId = user.userId;
    
    userRepo.findOne = jest.fn().mockResolvedValue(user);
  
    const result = await getByUserCode(userId);
  
    expect(result).toBeDefined();
    expect(result).toEqual(user);
    expect(userRepo.findOne).toHaveBeenCalledWith(
      { where: { userId: user.userId } }
    )
  })

  it('should handle id search errors', async () => {
    const user = getTestUser();
    const searchError = new Error('Search Error');

    userRepo.findOne = jest.fn().mockRejectedValue(searchError);

    await expect(getByUserCode(user)).rejects.toThrow(searchError);
  })
})

describe('signup', () => {
  it('return a new user', async () => {
    const reqBody = {
      firstName: 'new',
      lastName: 'guy',
      email: 'newGuy@email.com',
      password: 'password'
    };

    const newUser = getTestNewUser();

    userRepo.save = jest.fn().mockResolvedValue(newUser);

    const result = await signup(reqBody);

    expect(result).toBeDefined();
    expect(result).toEqual(newUser);
    expect(userRepo.save).toHaveBeenCalledWith(reqBody);
  })

  it('should handle signup errors', async () => {
    const user = getTestUser();
    const signupError = new Error('Signup Error');

    userRepo.save = jest.fn().mockRejectedValue(signupError);

    await expect(signup(user)).rejects.toThrow(signupError);
  })
})

describe('update a user', () => {
  it('should update a user', async () => {
    const user = getTestUser();
    const updateResult = { generatedMaps: [], raw: [], affected: 1 }
  
    userRepo.update = jest.fn().mockResolvedValue(updateResult);
  
    const result = await update(user.userId, user);

    expect(result).toBeDefined();
    expect(result.affected).toBe(1);
  });

  it('should handle update errors', async () => {
    const user = getTestUser();
    const updateError = new Error('Update Error');

    userRepo.update = jest.fn().mockRejectedValue(updateError);

    await expect(update(user.userId, user)).rejects.toThrow(updateError);
  })
})

// remove test
describe('remove a user', () => {
  it('should remove a user', async () => {
    const user = getTestUser();
    const deleteResult = { "raw": [], "affected": 1 }
    userRepo.delete = jest.fn().mockResolvedValue(deleteResult);

    const result = await remove(user.userId);

    expect(result).toBeDefined();
    expect(result.affected).toBe(1);
  });

  it('should handle deletion errors', async () => {
    const user = getTestUser();
    const deleteError = new Error('Delete Error');

    userRepo.delete = jest.fn().mockRejectedValue(deleteError);

    expect(remove(user)).rejects.toThrow(deleteError);
  })
})

// sanitize test
describe('sanitize user', () => {
  it('should delete unwanted properties', () => {
    const user = getTestUser();
    
    const sanitizedUser = getTestSanitizedUser();

    const result = sanitizeUserResponse(user);

    expect(result).toBeDefined();
    expect(result.email).toEqual(sanitizedUser.email);
    expect(result.password).toBeUndefined();
    expect(result.userId).toBeUndefined();
  })
})