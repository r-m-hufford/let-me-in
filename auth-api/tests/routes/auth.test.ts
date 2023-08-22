import request from 'supertest';
import express, { Request, Response } from 'express';
import { authRouter } from '../../src/routes/auth';
import { getByEmail } from '../../src/services/users';
import { validatePassword } from '../../src/services/password';
import { generateTokens } from '../../src/utils/jwt';
import { getTestUser } from '../../tests/test-helpers/users';

const app = express();
app.use(express.json());
app.use('/auth', authRouter);

jest.mock('../../src/services/users', () => ({
  getByEmail: jest.fn()
}));

jest.mock('../../src/services/password', () => ({
  validatePassword: jest.fn()
}));

jest.mock('../../src/utils/jwt', () => ({
  generateTokens: jest.fn()
}));

describe('login route', () => {
  it('should login successfully', async () => {
    const user = getTestUser();

  (getByEmail as jest.Mock).mockResolvedValue(user);
  (validatePassword as jest.Mock).mockResolvedValue(true);
  (generateTokens as jest.Mock).mockReturnValue('test-token');

  const response = await request(app).post('/auth/login');

  expect(response.status).toBe(200);
  expect(response.body).toEqual('test-token');
  expect(getByEmail).toHaveBeenCalledWith(expect.any(Object));
  expect(validatePassword).toHaveBeenCalledWith(expect.any(Object), user);
  expect(generateTokens).toHaveBeenCalledWith(user);
  })

  it('should handle user search error', async () => {
  const user = getTestUser();

  (getByEmail as jest.Mock).mockResolvedValue(null);

  const response = await request(app).post('/auth/login');

  expect(response.status).toBe(400);
  expect(response.body).toEqual({ error: 'Invalid email or password' });
  })

  it('should handle validate password error', async () => {
  const user = getTestUser();

  (getByEmail as jest.Mock).mockResolvedValue(user);
  (validatePassword as jest.Mock).mockResolvedValue(false);

  const response = await request(app).post('/auth/login');

  expect(response.status).toBe(400);
  expect(response.body).toEqual({ error: 'Invalid email or password' });
  expect(getByEmail).toHaveBeenCalledWith(expect.any(Object));
  expect(validatePassword).toHaveBeenCalledWith(expect.any(Object), user);
  })

  it('should handle internal server error', async () => {
  const user = getTestUser();
  const testError = new Error('Test Error');

  (getByEmail as jest.Mock).mockRejectedValue(testError);

  const response = await request(app).post('/auth/login');

  expect(response.status).toBe(500);
  expect(response.body).toEqual({ error: 'internal server error' });

  })
})