const jwt = require('jsonwebtoken');

// TODO add a decoded user token interface
export function auth(req, res, next) {
  console.log('auth middleware');

  const { url, method } = req;
  if (userIsSigningUpOrLoggingIn(url, method)) {
    return next();
  }

  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  };

  try {
    jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid Token' });
  }
}

function userIsSigningUpOrLoggingIn(url: string, method: string) {
  return method === 'POST' && (url === '/api/users/signup' || url === '/api/auth/login');
}