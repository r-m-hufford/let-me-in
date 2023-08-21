import * as bcrypt from 'bcrypt';
import { hashPassword, validatePassword, confirmNewPassword } from "../../src/services/password";
import { User } from '../../src/models/user';

jest.mock('bcrypt', () => ({
  genSalt: jest.fn(),
  hash: jest.fn(),
  compare: jest.fn()
}))

describe('validate password', () => {
  it('matching passwords', async () => {
    const reqBody = {password: 'myPassword'};
    const user = {password: 'myHashedPassword'} as User;
  
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
  
    const result = await validatePassword(reqBody, user);
  
    expect(result).toBeTruthy();
  });
  
  
  it('non-matching passwords', async () => {
    const reqBody = {password: 'myPassword'};
    const user = {password: 'myHashedPassword'} as User;
  
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);
  
    const result = await validatePassword(reqBody, user);
  
    expect(result).toBeFalsy();
  });
})


describe('signup password confirmation', () => {  
  it('password matches', () => {
    const reqBody = {
      password: 'matching',
      confirmPassword: 'matching'
    }
    const confirmPassword = confirmNewPassword(reqBody)
    expect(confirmPassword).toBeTruthy();
  });
  
  it('password does not match', () => {
    const reqBody = {
      password: 'matching',
      confirmPassword: 'notmatching'
    }
    const confirmPassword = confirmNewPassword(reqBody)
    expect(confirmPassword).toBeFalsy();
  });
})

describe('hash password', () => {  
  afterEach(() => {
    delete process.env.AUTH_PEPPER;
  });

  it('should return a non-empty string', async () => {
    (bcrypt.genSalt as jest.Mock).mockResolvedValue('mocked-salt');
    (bcrypt.hash as jest.Mock).mockResolvedValue('mocked-hash');

    const hashedPassword = await hashPassword('password');
    
    expect(hashedPassword).toBeDefined();
    expect(typeof hashedPassword).toBe('string');
    expect(hashedPassword.length).toBeGreaterThan(0);
  });
  
  it('should generate a hash based on input password and salt', async () => {
    (bcrypt.genSalt as jest.Mock).mockResolvedValue('mocked-salt');
    (bcrypt.hash as jest.Mock).mockResolvedValue('mocked-hash');

    // Mock the process.env.AUTH_PEPPER for the test
    process.env.AUTH_PEPPER = 'mocked-pepper';
  
    const hashedPassword = await hashPassword('password');
    
    expect(bcrypt.genSalt).toBeCalledWith(10);
    expect(bcrypt.hash).toBeCalledWith(`passwordmocked-pepper`, 'mocked-salt');
    expect(hashedPassword).toBe('mocked-hash');
  })
})