const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const tokenHeader = req.headers.authorization;
  if (tokenHeader && tokenHeader.startsWith('Bearer ')) {
    const token = tokenHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    res.locals.userId = decodedToken;
    next();
  } else {
    res.status(401).json({
      message: 'unauthorised',
    });
  }
};

module.exports = verifyToken;
