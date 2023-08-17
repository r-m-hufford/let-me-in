import { RevokedToken } from "../../src/models/revoked-token";
import { getAllTokens, checkForRevokedToken,revokedTokenRepo } from "../../src/services/revoked-tokens";

describe('check for revoked token', () => {
  it('should find a match', () => {
    const revokedTokens = ['token', 'revokedToken'];
    const token = 'revokedToken';

    const result = checkForRevokedToken(token, revokedTokens);

    expect(result).toBeTruthy();
  });
  
  it('should not find a match', () => {
    const revokedTokens = ['token', 'revokedToken'];
    const token = 'notARevokedToken';
  
    const result = checkForRevokedToken(token, revokedTokens);
  
    expect(result).toBeFalsy();
  });
})

describe('get all tokens', () => {
  it('should return an array of revoked tokens', async () => {
    // use isolated mocks in a test.
    // Why? sometimes mocks disrupt other tests 
    // like that one up there ⬆️
    // 1. cache the original
    const originalFind = revokedTokenRepo.find;
    // 2. create some data that matches the records
    const mockedTokens: RevokedToken[] = [
      {
        revokedTokenId: 1,
        token: 'revokedToken',
        iat: new Date(),
        expiresAt: new Date(),
        createdAt: new Date(),
        modifiedAt: new Date(),
      },
      {
        revokedTokenId: 2,
        token: 'anotherToken',
        iat: new Date(),
        expiresAt: new Date(),
        createdAt: new Date(),
        modifiedAt: new Date(),
      },
      {
        revokedTokenId: 2,
        token: 'aThirdToken',
        iat: new Date(),
        expiresAt: new Date(),
        createdAt: new Date(),
        modifiedAt: new Date(),
      }
    ];

    // 3. set the data as the resolved or returned value
    // this syntax: (revokedTokenRepo.find as jest.Mock).mockResolvedValue(mockedTokens); 
    // will lead to a type error because there is no Mock instance doing it this way
    revokedTokenRepo.find = jest.fn().mockResolvedValue(mockedTokens)

    // 4. call the function
    const result = await getAllTokens();

    expect(revokedTokenRepo.find).toBeCalled();
    expect(result).toEqual(mockedTokens.map((rt) => rt.token));

    // 5. reset the method to the cached original
    revokedTokenRepo.find = originalFind;
  })
})