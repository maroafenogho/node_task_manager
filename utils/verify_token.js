const jwt = require('jsonwebtoken');

const verifyToken = (tokenHeader) => {
  if (tokenHeader && tokenHeader.startsWith('Bearer ')) {
    const token = tokenHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    return decodedToken;
  }
  return null;
};

module.exports = verifyToken;
