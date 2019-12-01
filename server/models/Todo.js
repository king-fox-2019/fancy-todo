const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Queued", "Overdue" ,"Done"],
        default: "Queued"
    },
    due_date: {
        type: Date,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;