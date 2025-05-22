const User = require('../models/User/User');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if the header exists and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new UnauthenticatedError('Authentication invalid'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SALT);

    // Attach user info from token to the request
    req.user = {
      userId: payload.user.userId,
      role: payload.user.role,
    };

    return next();
  } catch (error) {
    console.log("🚀 ==> JWT verification failed:", error.message);
    return next(new UnauthenticatedError('Authentication invalid'));
  }
};

module.exports = auth;
