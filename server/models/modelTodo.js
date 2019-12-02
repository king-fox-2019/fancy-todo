const {Schema, model, models} = require('mongoose');

const todoSchema = new Schema(
    {
        name: String,
        description: String,
        status: String,
        due_date: Date,
        user_id: {type: Schema.Types.ObjectId, ref: 'User'}
    }
);

const Todo = model('Todo', todoSchema);

module.exports = {
    Todo
};