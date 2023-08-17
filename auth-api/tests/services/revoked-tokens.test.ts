import { getAllRecords, getAllTokens, checkForRevokedToken } from "../../src/services/revoked-tokens";

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
  })
})