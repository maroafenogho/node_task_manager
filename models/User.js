const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'required'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'required'],
  },
  username: {
    type: String,
  },
  name: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('User', UserSchema);
