/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { isError } = require('joi');
const User = require('../models/User');
const joiSchema = require('../validators/schemas');
const verifyToken = require('../middleware/verify_token');

const signUp = async (req, res) => {
  const {
    email, password, name, username,
  } = req.body;
  const saltRounds = 10;

  try {
    await joiSchema.validateAsync({ email: req.body.email, password: req.body.password });
    const existingUser = await User.exists({ email });
    if (existingUser) {
      return res.status(406).json({ success: false, message: 'User already exists' });
    }
    const hashPass = await bcrypt.hash(password, saltRounds);
    const user = await User.create({
      email, password: hashPass, name, username,
    });
    const token = await jwt.sign(user.id, process.env.JWT_KEY);
    return res.status(201).json({
      success: true,
      token,
      data: user,
    });
  } catch (error) {
    if (isError(error)) {
      if (error.details[0].path.includes('password')) {
        return res.status(405).json({ success: false, message: 'Password Malformed' });
      }
      if (error.details[0].path.includes('email')) {
        return res.status(405).json({ success: false, message: 'Email must be valid' });
      }
      return res.status(405).json({ success: false, message: error });
    }
    return res.status(500).json({ success: false, message: 'There seems to be an error. Please try again later' });
  }
};

const login = async (req, res) => {
  try {
    const existingUser = await User.find({ email: req.body.email });
    if (existingUser) {
      const user = existingUser[0];

      const passwordsMatch = await bcrypt.compare(req.body.password, user.password);
      if (!passwordsMatch) {
        return res.status(400).json({ success: false, message: 'Incorrect password' });
      }
      const token = await jwt.sign(user.id, process.env.JWT_KEY);
      return res.status(201).json({
        success: true,
        token,
        data: user,
      });
    }
    return res.status(404).json({ success: false, message: 'User not found' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Wahala' });
  }
};

// const checkToken = async (req, res) => {

//   const tokenHeader = req.headers.authorization;

//   if (tokenHeader && tokenHeader.startsWith('Bearer ')) {
//     const token = tokenHeader.split(' ')[1];
//     try {
//       const decodedToken = verifyToken(token);
//       const user = await User.findById(decodedToken);
//       return res.status(200).json({ success: true, data: { email: user.email, id: user.id, name: user.name } });
//     } catch (error) {
//       return res.status(500).json({ success: false, message: 'Unexpected Error' });
//     }
//   }
//   return res.status(401).json({ success: false, message: 'Unauthorized' });
// };

const checkToken = async (req, res) => {
  const userId = verifyToken(req.headers.authorization);
  if (userId) {
    try {
      const user = await User.findById(userId);
      return res.status(200).json({ success: true, data: { email: user.email, id: user.id, name: user.name } });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Unexpected Error' });
    }
  }
  return res.status(401).json({ success: false, message: 'Unauthorized' });
};

module.exports = { signUp, login, checkToken };
