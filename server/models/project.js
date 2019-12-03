const { Schema, model } = require('mongoose')

const ProjectSchema = new Schema ({
  name: {
    type: String,
    required: [true, 'Project Name is required']
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  todo_id: [{
    type: Schema.Types.ObjectId,
    ref: 'Todo'
  }]
} , {
  timestamps: true,
  versionKey: false
})

const Project = model('Project', ProjectSchema)

module.exports = Project