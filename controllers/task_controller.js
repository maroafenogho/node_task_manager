const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom_error')


const getTasks = asyncWrapper(async (req, res) => {
    const mongoTasks = await Task.find({})
    const newTasks = mongoTasks.map((task) => {
        const { id, title, completed } = task
        return { id, title, completed }
    })
    res.status(200).json({ success: true, data: newTasks })
})

const getSingleTask = asyncWrapper(async (req, res) => {
    const { id } = req.params
    const task = await Task.findById(id).exec()
    if (!task) {
        return next(createCustomError('No task matching provided id found.', 404))
    } else {
        return res.status(200).json({ success: true, data: task })
    }
})

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
})

const updateTask = asyncWrapper(async (req, res) => {
    // const { title, details, completed } = req.body
    const { id } = req.params

    const task = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })

    if (!task) {
        return next(createCustomError('Task not found', 404))
    } else {
        return res.status(200).json({ success: true, message: 'Task updated successfully', data: task })
    }
})
const deleteTask = asyncWrapper(async (req, res) => {
    const { id } = req.params
    const task = await Task.findByIdAndDelete(id)
    if (!task) {
        return next(createCustomError('Task not found', 404))
    } else {
        return res.status(200).json({ success: true, message: "Task successfully removed" })
    }
})

// const updateTask = 


module.exports = { getTasks, createTask, getSingleTask, updateTask, deleteTask }