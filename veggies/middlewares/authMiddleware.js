const jwt = require('jsonwebtoken');
const secretKey = 'vansh1'; // Replace with your secret key

function verifyToken(req, res, next) {
  // Get the token from the request headers
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token is missing.' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token.split(' ')[1], secretKey);
    // You can now access the decoded user ID as decoded.userId
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ message: 'Access denied. Invalid token.' });
  }
}

module.exports = verifyToken;
