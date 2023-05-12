/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'title must be provided'],
    trim: true,
    maxlength: [20, 'title cannot be more than 20 characters long'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  created_by: {
    type: String,
  },
  created_on: {
    type: Date,
    default: Date.now(),
  },
  details: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model('Task', TaskSchema);
