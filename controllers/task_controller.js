/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
/* eslint-disable no-console */
const Task = require('../models/Task');

const getTasks = async (req, res) => {
  const userId = res.locals.userId;

  try {
    const mongoTasks = await Task.find({ created_by: userId });
    const newTasks = mongoTasks.map((task) => {
      const {
        id, title, completed, created_on,
      } = task;
      return {
        id, title, completed, created_on,
      };
    });
    return res.status(200).json({ success: true, data: newTasks });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Something went wrong, please try again' });
  }
};

const getSingleTask = async (req, res) => {
  const userId = res.locals.userId;

  const { id } = req.params;
  try {
    const task = await Task.findById(id).exec();
    if (!task || task.created_by !== userId) {
      return res.status(404).json({ success: false, message: 'No matching task found' });
    }
    return res.status(200).json({ success: true, data: task });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Something went wrong, please try again' });
  }
};

const createTask = async (req, res) => {
  const userId = res.locals.userId;

  const { title } = req.body;
  try {
    const existingTask = await Task.exists({ title, created_by: userId });
    if (!existingTask) {
      // eslint-disable-next-line max-len
      const task = await Task.create({ title: req.body.title, details: req.body.details, created_by: userId });
      return res.status(201).json({ task });
    }
    return res.status(406).json({ success: false, message: 'Task already exists' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Something went wrong, please try again' });
  }
};

const updateTask = async (req, res) => {
  // const { title, details, completed } = req.body;
  const userId = res.locals.userId;

  const { id } = req.params;
  try {
    const existingTask = await Task.findById(id).exec();
    if (existingTask && existingTask.created_by === userId) {
      const task = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      return res.status(200).json({ success: true, message: 'Task updated successfully', data: task });
    }
    return res.status(404).json({ success: false, message: 'Task not found' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Something went wrong, please try again' });
  }
};

const deleteTask = async (req, res) => {
  const userId = res.locals.userId;

  const { id } = req.params;
  const existingTask = await Task.findById(id).exec();
  try {
    if (existingTask && existingTask.createdBy === userId) {
      await Task.findByIdAndDelete(id);
      return res.status(200).json({ success: true, message: 'Task successfully removed' });
    }
    return res.status(404).json({ success: false, message: 'Task not found' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Something went wrong, please try again' });
  }
};

// const updateTask =

module.exports = {
  getTasks, createTask, getSingleTask, updateTask, deleteTask,
};
