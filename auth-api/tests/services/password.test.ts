import * as bcrypt from 'bcrypt';
import { hashPassword, validatePassword, confirmNewPassword } from "../../src/services/password";

jest.mock('bcrypt', () => ({
  genSalt: jest.fn(),
  hash: jest.fn()
}))
describe('password service', () => {
  let user; 

  beforeAll( () => {
    user = {
      password: 'match'
    }
  }
  )
  it('validate matching passwords', async () => {
    const matchingPasswords = await validatePassword('match', user.password)
    expect(matchingPasswords).toBeTruthy();
  });

  
  it('validate non-matching passwords', async () => {
    const notMatchingPasswords = await validatePassword('notmatch', user.password)
    expect(notMatchingPasswords).toBeFalsy();
  });

  it('confirmation password matches', () => {
    const reqBody = {
      password: 'matching',
      confirmPassword: 'matching'
    }
    const confirmPassword = confirmNewPassword(reqBody)
    expect(confirmPassword).toBeTruthy();
  });
  
  it('confirmation password does not match', () => {
    const reqBody = {
      password: 'matching',
      confirmPassword: 'notmatching'
    }
    const confirmPassword = confirmNewPassword(reqBody)
    expect(confirmPassword).toBeFalsy();
  });

  it('hash should return a non-empty string', async () => {
    (bcrypt.genSalt as jest.Mock).mockResolvedValue('mocked-salt');
    (bcrypt.hash as jest.Mock).mockResolvedValue('mocked-hash');

    const hashedPassword = await hashPassword('password');

    expect(hashedPassword).toBeDefined();
    expect(typeof hashedPassword).toBe('string');
    expect(hashedPassword.length).toBeGreaterThan(0);
  });
})