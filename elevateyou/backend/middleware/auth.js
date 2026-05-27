const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.warn('Auth Middleware: Missing Authorization header');
      return res.status(401).json({ message: 'Authentication failed: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    
    // Support demo-token for no-db fallback
    if (token === 'demo-token') {
      req.userData = { userId: 'demo-user', name: 'Demo User' };
      return next();
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { userId: decodedToken.userId, name: decodedToken.name };
    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error.message);
    res.status(401).json({ message: 'Authentication failed: ' + error.message });
  }
};
