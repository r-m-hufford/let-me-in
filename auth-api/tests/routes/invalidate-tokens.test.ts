import { RevokedToken } from '../../src/models/revoked-token';
import request from 'supertest';
import express, { Request, Response } from 'express';
import { invalidateToken } from '../../src/utils/jwt';
import { invalidateTokensRouter } from '../../src/routes/invalidate-tokens';

jest.mock('../../src/utils/jwt', () => ({
  //bring in the entire service and then its parts. import it too
  invalidateToken: jest.fn()
}));

const app = express();
app.use(express.json());
app.use('/invalidatetokens', invalidateTokensRouter);


describe('POST /invalidatetokens', () => {
  it('should invalidate tokens', async () => {
    (invalidateToken as jest.Mock).mockResolvedValue('invalid-token');
    const response = await request(app)
      .post('/invalidatetokens/')
      .set('x-auth-token', 'valid-token');

    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('token revoked');
  })
})