'use strict'

const { Schema, model } = require('mongoose')

const todoSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title cannot be empty!']
  },
  description: {
    type: String,
    required: [true, 'Description cannot be empty!']
  },
  dueDate: {
    type: Date,
    required: [true, 'Due Date cannot be empty!']
  },
  status: {
    type: Boolean,
  },
  userId: {
    type: Schema.Types.ObjectId, ref: 'User'
  }
})

const Todo = model('Todo', todoSchema)

module.exports = Todo