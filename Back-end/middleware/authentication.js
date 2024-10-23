const User=require('../models/User/User')
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication invalid');
  }
  const token = authHeader.split('_')[1];
  console.log("🚀 ==> file: authentication.js:14 ==> auth ==> token:", token);



  // // try {
    // const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log("🚀 ==> file: authentication.js:19 ==> auth ==> payload:", payload);

  //   // attach the user to the job routes
  //   req.user = { userId: payload.userId, testUser };
  //   console.log("🚀 ==> file: authentication.js:21 ==> auth ==> req.user:", req.user);

  //   // next();
  // // } catch (error) {
  // //   throw new UnauthenticatedError('Authentication invalid');
  // // }
};

module.exports = auth;
