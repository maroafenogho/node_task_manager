const express = require('express');
const verifyToken = require('../middleware/verify_token');

const router = express.Router();

const {
  getTasks, updateTask, createTask, getSingleTask, deleteTask,
} = require('../controllers/task_controller');

// router.use(verifyToken);

router.get('/', verifyToken, getTasks);
router.get('/:id', verifyToken, getSingleTask);
router.post('/', verifyToken, createTask);
router.patch('/:id', verifyToken, updateTask);
router.delete('/:id', verifyToken, deleteTask);

module.exports = router;
