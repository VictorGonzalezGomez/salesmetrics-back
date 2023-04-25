const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid authorization token' });
    }

    const { user } = decodedToken;

    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'User is not authorized to perform this action' });
    }

    // Store the decoded token in the request object for later use
    req.decodedToken = decodedToken;

    next();
  });
};

module.exports = isAdmin;