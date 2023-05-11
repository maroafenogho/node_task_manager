/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const signUp = async (req, res) => {
  const {
    email, password, name, username,
  } = req.body;
  const saltRounds = 10;

  try {
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
    return res.status(500).json({ success: false, message: 'There seems to be an error. Please try again later' });
  }
};

const login = async (req, res) => {
  try {
    const existingUser = await User.find({ email: req.body.email });
    if (existingUser) {
      const user = existingUser[0];

      console.log(existingUser);
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

module.exports = { signUp, login };
