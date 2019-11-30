const { Schema, model } = require('mongoose')

const TodoSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    status: {
        type: Boolean,
        default: false
    },
    dueDate: {
        type: Date,
        required: [true, 'Due date is required'],
        min: [new Date().setDate(new Date().getDate() - 1), 'The date you entered is invalid or outdated']
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
    versionKey: false
})

const Todo = model('Todo', TodoSchema)
module.exports = Todo
