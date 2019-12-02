"use strict"

const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Task title is required'
  },
  description: String,
  done: {
    type: Boolean,
    default: false
  },
  due_date: {
    type: Date,
    min: [new Date().toLocaleDateString(), 'Due date can not be earlier than today'],
    required: true
  },
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Task', TaskSchema);