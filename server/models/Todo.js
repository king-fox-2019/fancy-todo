const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new mongoose.Schema({
    UserId: { type: Schema.Types.ObjectId, ref: 'User' },
    name: String,
    description: String,
    status: Boolean,
    due_date: Date
})

const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo