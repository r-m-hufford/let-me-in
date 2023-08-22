import request from "supertest";
import express, { Request, Response, response } from 'express';
import { userRouter } from "../../src/routes/users";
import { getTestSanitizedUser, getTestUser } from "../test-helpers/users";
import { sanitizeUserResponse, signup, whoami, update, getById, remove } from "../../src/services/users";
import { generateTokens } from "../../src/utils/jwt";
import { confirmNewPassword } from "../../src/services/password";

jest.mock('../../src/services/users', () => ({
  whoami: jest.fn(),
  sanitizeUserResponse: jest.fn(),
  signup: jest.fn(),
  update: jest.fn(),
  getById: jest.fn(),
  remove: jest.fn()
}));

jest.mock('../../src/utils/jwt', () => ({
  generateTokens: jest.fn()
}))

jest.mock('../../src/services/password', () => ({
  confirmNewPassword: jest.fn()
}))

const app = express();
app.use(express.json());
app.use('/user', userRouter);

describe('GET /user/whoami', () => {
  it('should return santized user data', async () => {
    const mockedUser = getTestUser();
    const sanitizedUser = getTestSanitizedUser();
    
    (whoami as jest.Mock).mockResolvedValue(mockedUser);
    (sanitizeUserResponse as jest.Mock).mockReturnValue(sanitizedUser);

    const response = await request(app).get('/user/whoami');
    
    expect(response.status).toBe(200);
    expect(response.body.email).toEqual(sanitizedUser.email);
    expect(whoami).toHaveBeenCalledWith(expect.any(Object));
  })
  
  // not found
  it('should handle user not found', async () => {
    (whoami as jest.Mock).mockResolvedValue(null);
    
    const response = await request(app).get('/user/whoami');
    
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'user not found' });
  })
  
  //internal server error
  it('should handle an internal server error', async () => {
    (whoami as jest.Mock).mockRejectedValue(new Error('Test error'));

    const response = await request(app).get('/user/whoami');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'internal server error' });
  })
})

// sign up
describe('POST /user/signup', () => {
  it('should return new user tokens', async () => {
    const user = getTestUser();
    const mockedSignupForm = {
      firstName: 'jane',
      lastName: 'doe',
      email: 'jane@doe.com',
      password: 'password',
      confirmPassword: 'password'
    };

    const mockedTokens = {
      accessToken: 'test-token',
      refreshToken: 'test-token'
    };

    (signup as jest.Mock).mockResolvedValue(user);
    (confirmNewPassword as jest.Mock).mockReturnValue(true);
    (generateTokens as jest.Mock).mockResolvedValue(mockedTokens);
    const response = await request(app).post('/user/signup');

    expect(response.status).toBe(201);
    expect(signup).toHaveBeenCalledWith(expect.any(Object));
    expect(generateTokens).toHaveBeenCalledWith(user);
});

  
  it('should handle mismatched passwords', async () => {
    const mockedSignupForm = {
      firstName: 'jane',
      lastName: 'doe',
      email: 'jane@doe.com',
      password: 'password',
      confirmPassword: 'notpassword'
    };

    (confirmNewPassword as jest.Mock).mockReturnValue(false);
    const response = await request(app).post('/user/signup');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: 'passwords do not match' });
  })

  it('should handle internal server error', async () => {
    (signup as jest.Mock).mockRejectedValue(new Error('Test error'));

    (confirmNewPassword as jest.Mock).mockReturnValue(true);
    const response = await request(app).post('/user/signup');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'internal server error' });  })
})

// update
describe('PUT /user/update', () => {
  // successful update
  it('should update a record', async () => {
    const user = getTestUser();
    
    (update as jest.Mock).mockResolvedValue(user);
    (getById as jest.Mock).mockResolvedValue(user.userId);
    
    const response = await request(app).put('/user/update');

    expect(response.status).toBe(200);
    expect(update).toHaveBeenCalled();
    expect(getById).toHaveBeenCalled();
  });

  // user not found
  it('should handle user not found', async () => {
    const user = getTestUser();

    (update as jest.Mock).mockResolvedValue(user);
    (getById as jest.Mock).mockResolvedValue(null);

    const response = await request(app).put('/user/update');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'user not found' });
  })

  // internal server error
  it('should handle internal server error', async () => {
    const user = getTestUser();
    (update as jest.Mock).mockRejectedValue(new Error('Test error'));
    (getById as jest.Mock).mockResolvedValue(user);

    const response = await request(app).put('/user/update');


    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'internal server error' });
  })
})
// remove
describe('PUT /user/update', () => {
  // successful update
  it('should delete a record', async () => {
    const user = getTestUser();
    const deleteResult = { "raw": [], "affected": 1 };

    
    (remove as jest.Mock).mockResolvedValue(deleteResult);
    
    const response = await request(app).delete('/user/update');

    expect(response.status).toBe(200);
    expect(remove).toHaveBeenCalled();
  });

  // internal server error
  it('should handle internal server error', async () => {
    const user = getTestUser();

    (remove as jest.Mock).mockRejectedValue(new Error('Test error'));

    const response = await request(app).delete('/user/remove');


    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'internal server error' });
  })
})