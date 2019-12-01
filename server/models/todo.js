const mongoose = require('mongoose')
const { Schema } = mongoose

const todoSchema = new Schema({
    UserId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    title: {
        type: String,
        required: [true, 'Please input title task.']
    },
    description: {
        type: String
    },
    dueDate: {
        type: Date,
        default: new Date().setDate(new Date().getDate() + 1),
        min: [new Date().setDate(new Date().getDate() - 1), 'Invalid due-date input']
    },
    status: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo