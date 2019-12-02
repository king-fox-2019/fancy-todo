const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name can not be empty']
    },
    description: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    },
    dueDate: {
        type: Date
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project"
    }
},{
    timestamps: true
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;