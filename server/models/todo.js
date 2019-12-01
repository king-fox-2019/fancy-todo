const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:Boolean,
    dueDate:Date,
    userId:String
})

const Todo = mongoose.model('Todo',todoSchema)

module.exports = Todo