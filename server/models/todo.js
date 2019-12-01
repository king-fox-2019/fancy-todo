const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        default: "pending"
    },
    due_date: {
        type: Date,
        required: true
        // default tomorrow
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    }
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo