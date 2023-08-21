import { myDataSource } from "../../app-data-source";
import { RevokedToken } from "../models/revoked-token";

export const revokedTokenRepo = myDataSource.getRepository(RevokedToken);

export async function getAllTokens(): Promise<string[]> {
  const revokedTokens = await revokedTokenRepo.find();
  return revokedTokens.map((rt) => rt.token);
}

export function checkForRevokedToken(token: string, revokedTokens: string[]): boolean {
  return revokedTokens.includes(token);
}