const mongoose = require('mongoose')
const { Schema } = mongoose

const projectSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please input project name.']
  },
  description: {
    type: String,
    required: [true, 'Please input project description.']
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  pendingMembers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  todos: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Todo'
    }
  ]
}, { timestamps: true })


const Project = mongoose.model('Project', projectSchema)
module.exports = Project