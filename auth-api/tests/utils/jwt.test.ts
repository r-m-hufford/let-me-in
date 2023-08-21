import { getTestUser } from '../test-helpers/users';
import { decodeToken, generateTokens, invalidateToken, verifyToken } from '../../src/utils/jwt';
import * as jsonwebtoken from 'jsonwebtoken';
import { revokedTokenRepo } from '../../src/services/revoked-tokens';
import { RevokedToken } from '../../src/models/revoked-token';

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  decode: jest.fn(),
  verify: jest.fn()
}))

jest.mock("../../src/models/revoked-token", () => ({
  RevokedToken: jest.fn()
}));

describe('generate tokens', () => {
  it('should return access and refresh tokens', () => {
    const user = getTestUser();
    (jsonwebtoken.sign as jest.Mock).mockReturnValue('token');
  
    const result = generateTokens(user);
    
    expect(result).toBeDefined();
    expect(result).toEqual({ accessToken: 'token', refreshToken: 'token' })
  })
})

describe('invalidate tokens', () => {
  it('should create a new RevokedToken record', async () => {
    const testToken = 'test-token';
    const decodedPayload = {
      userCode: 'abc123'
    };

    (jsonwebtoken.decode as jest.Mock).mockReturnValue(decodedPayload);

    revokedTokenRepo.save = jest.fn().mockResolvedValue(testToken);
    await invalidateToken(testToken);

    expect(jsonwebtoken.decode).toHaveBeenCalledWith(testToken);
    expect(RevokedToken).toHaveBeenCalledWith();
    expect(revokedTokenRepo.save).toHaveBeenCalledWith(expect.any(RevokedToken));
  })
})

describe('verify token', () => {
  it('should verify a jwt', () => {
    const testToken = 'test-token';
    (jsonwebtoken.verify as jest.Mock).mockReturnValue(true);

    const result = verifyToken(testToken);

    expect(result).toBeTruthy();
  });

  it('should not verify a jwt', () => {
    const testToken = 'test-token';
    (jsonwebtoken.verify as jest.Mock).mockReturnValue(false);

    const invalidResult = verifyToken('invalid-token');

    expect(invalidResult).toBeFalsy();
  })
})

describe('decode token', () => {
  it('should decode a jwt', () => {
    const testToken = 'testToken';
    const decodedToken = {
      userCode: 'abc123'
    };

    (jsonwebtoken.decode as jest.Mock).mockReturnValue(decodedToken);

    const result = decodeToken(testToken);

    expect(jsonwebtoken.decode).toHaveBeenCalledWith(testToken)
    expect(result).toEqual(decodedToken);
  })
})