const {Schema, model, models} = require('mongoose');

const todoSchema = new Schema(
    {
        name: String,
        description: String,
        status: String,
        due_date: Date
    }
);

const Todo = model('Todo', todoSchema);

module.exports = {
    Todo
};