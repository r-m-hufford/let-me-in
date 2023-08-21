import { TokenExpiredError } from "jsonwebtoken";
import { decodeToken, generateTokens, verifyToken } from "../utils/jwt";
import { User } from "../models/user";
import { checkForRevokedToken, getAllTokens } from "../services/revoked-tokens";


const jwt = require('jsonwebtoken');

export async function auth(req, res, next) {
  console.log('auth middleware');

  const { url, method } = req;
  if (userIsSigningUpOrLoggingIn(url, method)) {
    return next();
  }

  let token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  };

  if (await tokenIsRevoked(token)) return res.status(401).json({ error: 'Invalid Token' });

  try {
    verifyToken(token);
    req.body.userCode = getReqUserCode(token);
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      // check for refresh token
      const refreshToken = req.header('x-auth-refreshToken');
      if (!refreshToken) res.status(401).json({ error: 'Unauthorized' });
      try {
        // verify the refresh token
        if (!verifyToken(refreshToken)) res.status(401).json({ error: 'Unauthorized' });
        const refreshData = decodeToken(refreshToken);
        // create the new tokens
        token = generateTokens({ email: refreshData.email, userCode: refreshData.userCode } as Partial<User>);
        req.body.userCode = getReqUserCode(token);
        // res.header(token);
        return next();
      } catch (error) {
        console.error(error);
        return res.status(401).json({ error: 'Invalid Token' });
      }
    }
    console.error(error);
    return res.status(401).json({ error: 'Invalid Token' });
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