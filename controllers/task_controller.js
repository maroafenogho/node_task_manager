let tasks = require('../tasks')
const Task = require('../models/Task')

const getTasks = async (req, res) => {

    try {
        const mongoTasks = await Task.find({})
        const newTasks = mongoTasks.map((task) => {
            const { id, title, completed } = task

            return { id, title, completed }
        })

        res.status(200).json({ success: true, tasks: newTasks })
    } catch (error) {
        res.status(500).json({ msg: error })
    }


}
const getSingleTask = async (req, res) => {
    const { id } = req.params
    try {
        const task = await Task.findById(id).exec()
        // const task = mongoTasks.find((task) => task.id === id)
        if (!task) {
            return res.status(404).json({ success: false, message: 'No task matching provided id found.' })
        } else {
            return res.status(200).json({ success: true, task: task })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'server error.' })

    }

}

const createTask = async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task })

}

const updateTask = async (req, res) => {
    // const { title, details, completed } = req.body
    const { id } = req.params

    const task = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })

    if (!task) {
        return res.status(404).json({ success: false, message: 'Task not found' })
    } else {

        return res.status(200).json({ success: true, message: 'Task updated successfully', task: task })

    }
}

const deleteTask = async (req, res) => {
    const { id } = req.params
    try {
        const task = await Task.findByIdAndDelete(id)
        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" })
        } else {
            return res.status(200).json({ success: true, message: "Task successfully removed" })
        }

    } catch (error) {
        res.status(500).json({ success: true, message: "Error" })
    }
    // const task = tasks.find((task) => task.id === Number(id))
    // if (!task) {
    //     res.status(404).json({ success: false, message: 'Task does not exist' })
    // } else {
    //     tasks.map((task) => {
    //         if (task.id === Number(id)) {
    //             tasks.splice(tasks.indexOf(task, 1))
    //         }
    //         return task
    //     })

    // }
}

// const updateTask = 


module.exports = { getTasks, createTask, getSingleTask, updateTask, deleteTask }