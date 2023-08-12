import { myDataSource } from "../../app-data-source";
import { RevokedToken } from "../models/revoked-token";

const revokedTokenRepo = myDataSource.getRepository(RevokedToken);

export async function getAllRecords(): Promise<RevokedToken[]> {
  const tokens = await revokedTokenRepo.find()
  console.log({ tokens });
  return tokens;
}

export async function getAllTokens(): Promise<string[]> {
  const revokedTokens = await getAllRecords()
  return revokedTokens.map((rt) => rt.token);
}

export function checkForRevokedToken(token: string, revokedTokens: string[]): boolean {
  return revokedTokens.includes(token);
}