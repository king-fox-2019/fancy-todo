'use strict'

const { Schema, model } = require('mongoose')

// title, dex, dueDate
const todoSchema = new Schema({
  title: {
    type: String,
    required =[true, 'Title cannot be empty!']
  },
  description: {
    type: String,
    required =[true, 'Title cannot be empty!']
  },
  dueDate: {
    type: Date,
    required =[true, 'Title cannot be empty!']
  }
})

const Todo = model('Todo', todoSchema)

module.exports = Todo