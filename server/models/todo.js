const mongoose = require('mongoose')
const { Schema } = mongoose

const todoSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is required']
    },
    description: {
        type: String
    },
    dueDate: {
        type: Date,
        required: [true, 'due date is required']
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status: String,
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }
}, {timestamps: true, versionKey: false})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo
