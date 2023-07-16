const jwt = require('jsonwebtoken');

// TODO add a decoded user token interface
export function auth(req, res, next) {
  console.log('auth middleware');
  const token = req.header('x-auth-token');

  if (!token) console.log('woah!!! we got no token here!');

  const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  req.userEmail = decoded.email;
  
  next();
}