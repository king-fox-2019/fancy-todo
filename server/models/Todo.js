const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({

   name: {
      type: String,
      required: true
   },
   description: String,
   status: {
      type: Boolean,
      required: true,
      default: false
   },
   due_date: Date,
   user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   createdAt: {
      type: Date,
      default: Date.now()
   },
   updatedAt: {
      type: Date,
      default: Date.now()
   }
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo