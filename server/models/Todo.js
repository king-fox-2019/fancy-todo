const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
const TodoSchema = new Schema({
    title: String,
    description: String,
    dueDate: Date,
    status: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    } 
});

const Model = mongoose.model('Todo', TodoSchema)
module.exports = Model