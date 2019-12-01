const mongoose = require('mongoose')
const Schema = mongoose.Schema


const todoSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title todo is required'],
    maxLength: [25, 'Max length of title is 25'],
  },
  description: String,
  owner: {
    type: Schema.Types.ObjectId,
    required: [true, 'Owner Id is required for creating todo'],
    ref: 'User'
  },
})


const Todo = mongoose.model('Todo', todoSchema)


module.exports = Todo
