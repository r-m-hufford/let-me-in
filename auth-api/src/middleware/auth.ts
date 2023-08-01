import { TokenExpiredError } from "jsonwebtoken";
import { generateToken } from "../utils/jwt";
import { User } from "../models/user";
import { myDataSource } from "../../app-data-source";
import { RevokedTokens } from "../models/revoked-token";
const revokedTokenRepo = myDataSource.getRepository(RevokedTokens);


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

  if (await checkForRevokedTokens(token)) return res.status(401).json({ error: 'Invalid Token' });

  try {
    verifyToken(token);
    req.body.user_code = setReqUserCode(token);
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      // check for refresh token
      const refreshToken = req.header('x-auth-refreshToken');
      if (!refreshToken) res.status(401).json({ error: 'Unauthorized' });
      try {
        // verify the refresh token
        const refreshData = verifyToken(refreshToken);
        // create the new tokens
        token = generateToken({ email: refreshData.email, userCode: refreshData.userCode } as User);
        req.body.userCode = setReqUserCode(token);
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

async function checkForRevokedTokens(token): Promise<boolean> {
  const revokedTokens = await revokedTokenRepo.find();
  for (let revokedToken of revokedTokens) {
    if (token === revokedToken.token) return true
  };
  return false;
}

function userIsSigningUpOrLoggingIn(url: string, method: string): boolean {
  return method === 'POST' && (url === '/api/users/signup' || url === '/api/auth/login');
}

function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_PRIVATE_KEY);
}

function setReqUserCode(token: string) {
  const decoded = jwt.decode(token);
  console.log("decoded: ", decoded.user_code)
  return decoded.user_code;
}