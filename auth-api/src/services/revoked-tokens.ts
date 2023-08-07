import { myDataSource } from "../../app-data-source";
import { RevokedToken } from "../models/revoked-token";

const revokedTokenRepo = myDataSource.getRepository(RevokedToken);

export async function getAllRecords() {
  return await revokedTokenRepo.find();
}

export async function getAllTokens() {
  const revokedTokens = await this.getAllRecords()
  return revokedTokens.map((rt) => rt.token);
}