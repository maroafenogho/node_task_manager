const mongoose = require('mongoose')

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
    details: {
        type: String,
        trim: true
    }
})

module.exports = mongoose.model('Task', TaskSchema)