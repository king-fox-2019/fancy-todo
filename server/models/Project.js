const { Schema, model } = require('mongoose')

const projectSchema = new Schema({
  title: {
    type: String,
    required: [true, 'title cannot be empty']
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  todos: [{
    type: Schema.Types.ObjectId,
    ref: 'Todo'
  }]
}, {
  versionKey: false,
  timestamps: true
})

const Project = model('Project', projectSchema)

module.exports = Project