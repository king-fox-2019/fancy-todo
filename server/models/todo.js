const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    name:String,
    description:String,
    status:Boolean,
    dueDate:Date,
    userId:String
})

const Todo = mongoose.model('Todo',todoSchema)

module.exports = Todo