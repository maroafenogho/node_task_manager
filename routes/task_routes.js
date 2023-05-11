const express = require('express');

const router = express.Router();

const {
  getTasks, updateTask, createTask, getSingleTask, deleteTask,
} = require('../controllers/task_controller');

// const { createTask } = require('../controllers/task_controller');
// const { getSingleTask } = require('../controllers/task_controller');
// const { deleteTask } = require('../controllers/task_controller');

router.route('/').get(getTasks).post(createTask);
router.route('/:id').get(getSingleTask).patch(updateTask).delete(deleteTask);

module.exports = router;
