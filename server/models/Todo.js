const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    name: String,
    description: String,
    status: String,
    due_date: Date
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;