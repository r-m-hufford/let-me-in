import request from "supertest";
import express, { Request, Response } from 'express';
import { userRouter } from "../../src/routes/users";
import { getTestSanitizedUser, getTestUser } from "../test-helpers/users";
import { sanitizeUserResponse, whoami } from "../../src/services/users";

// add mocks here
jest.mock('../../src/services/users', () => ({
  whoami: jest.fn(),
  sanitizeUserResponse: jest.fn()
  // Other mock functions...
}));

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