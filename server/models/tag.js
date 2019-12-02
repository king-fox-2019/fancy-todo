"use strict"

const mongoose = require('mongoose')

const TagSchema = new mongoose.Schema({
  name: String,
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  task_list: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true
  }]
}, {
  timestamps: true
})

module.exports = mongoose.model('Tag', TagSchema);