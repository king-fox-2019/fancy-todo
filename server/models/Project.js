const mongoose = require('mongoose')
const { Schema } = mongoose

const projectSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please name your project!']
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  todos: [{
    type: Schema.Types.ObjectId,
    ref: 'Todo'
  }],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

const Project = mongoose.model('Project', projectSchema)
module.exports = Project