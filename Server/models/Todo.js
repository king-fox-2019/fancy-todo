const mongoose = require('mongoose')
const Schema = mongoose.Schema
const today = new Date()
const tommorow = new Date(today.getFullYear(), today.getMonth(), today.getDate()+1)

const todoSchema = new Schema({
  name: {
    type: String,
    required: [true, `Todo name is required`]
  },
  description: {
    type: String,
    required: [true, `Todo description is required`]
  },
  status: {
    type: String,
    default: 'not done'
  },
  due_date: {
    type: Date,
    default: tommorow
  },
  userId: [{ 
    type: Schema.Types.ObjectId,
    ref: 'User' 
  }]
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo