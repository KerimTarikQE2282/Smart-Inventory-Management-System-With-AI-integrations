const User=require('../models/User/User')
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  console.log("🚀 ==> file: authentication.js:8 ==> auth ==> authHeader:", authHeader);


  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication invalid');
  }
  const token = authHeader.split('_')[1];
  console.log("🚀 ==> file: authentication.js:14 ==> auth ==> token:", token);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = { userId: payload.user.userId,role:payload.user.role };  
    next();
  } catch (error) {
    console.log("🚀 ==> file: authentication.js:31 ==> auth ==> error:", error);

    throw new UnauthenticatedError('Authentication invalid');
  }
};

module.exports = auth;
