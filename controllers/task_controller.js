const Task = require('../models/Task')
const { createCustomError } = require('../errors/custom_error')


const getTasks = async (req, res) => {
    const mongoTasks = await Task.find({})
    const newTasks = mongoTasks.map((task) => {
        const { id, title, completed } = task
        return { id, title, completed }
    })
    res.status(200).json({ success: true, data: newTasks })
}

const getSingleTask = async (req, res) => {
    const { id } = req.params
    try {
        const task = await Task.findById(id).exec()
        if (!task) {
            return res.status(404).json({ success: false, message: 'No matching task found' })

        } else {
            return res.status(200).json({ success: true, data: task })
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Something went wrong, please try again' })

    }
}

const createTask = async (req, res) => {
    const { title } = req.body
    try {
        const existingTask = await Task.exists({ title: title })
        if (!existingTask) {
            const task = await Task.create(req.body)
            res.status(201).json({ task })
        } else {
            res.status(406).json({ success: false, message: 'Task already exists' })
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Something went wrong, please try again' })

    }
}

const updateTask = async (req, res) => {
    const { title, details, completed } = req.body
    const { id } = req.params
    const existingTask = await Task.findById(id).exec()
    try {
        const task = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' })
        } else {
            return res.status(200).json({ success: true, message: 'Task updated successfully', data: task })
        }
        // const existingTask = await Task.find({ title: title }).exec()
        // console.log(existingTask)
        // if (!existingTask || existingTask[0].id === id) {

        // } else {
        //     return res.status(406).json({ success: false, message: 'Task already exists' })
        // }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Something went wrong, please try again' })

    }



}

const deleteTask = async (req, res) => {
    const { id } = req.params
    try {
        const task = await Task.findByIdAndDelete(id)
        if (!task) {
            return next(createCustomError('Task not found', 404))
        } else {
            return res.status(200).json({ success: true, message: "Task successfully removed" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Something went wrong, please try again' })

    }
}

// const updateTask = 


module.exports = { getTasks, createTask, getSingleTask, updateTask, deleteTask }