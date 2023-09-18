import { TokenExpiredError } from "jsonwebtoken";
import { decodeToken, generateTokens, verifyToken } from "../utils/jwt";
import { User } from "../models/user";
import { checkForRevokedToken, getAllTokens } from "../services/revoked-tokens";
import { CustomError } from "./customError";


const jwt = require('jsonwebtoken');

export async function auth(req, res, next) {
  let token;
  try {
    const { url, method } = req;
    if (userIsSigningUpOrLoggingIn(url, method)) {
      return next();
    }
  
    token = req.header('x-auth-token');
    if (!token) {
      throw new CustomError(401, 'token not found');
    };
  
    if (await tokenIsRevoked(token)) throw new CustomError(401, 'invalid token');
    verifyToken(token);
    req.body.userCode = getReqUserCode(token);

    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      try {
        const refreshToken = req.header('x-auth-refreshToken');
        if (!refreshToken) throw new CustomError(401, 'unauthorized');
        // verify the refresh token
        if (!verifyToken(refreshToken)) throw new CustomError(401, 'unauthorized');
        const refreshData = decodeToken(refreshToken);
        // create the new tokens
        token = generateTokens({ email: refreshData.email, userCode: refreshData.userCode } as Partial<User>);
        req.body.userCode = getReqUserCode(token);
        return next();
      } catch (error) {
        next(error);
      }
    }
    next(error);
  }
}

async function tokenIsRevoked(token): Promise<boolean> {
  const revokedTokens = await getAllTokens();
  return checkForRevokedToken(token, revokedTokens);
}

function userIsSigningUpOrLoggingIn(url: string, method: string): boolean {
  return method === 'POST' && (url === '/api/users/signup' || url === '/api/auth/login');
}

function getReqUserCode(token: string): string {
  const decoded = decodeToken(token);
  return decoded.userCode;
}