const {Schema, model} = require('mongoose')

const todoSchema = new Schema ({
    name: {
        type: String,
        required: [true, 'Please enter todo\'s name.']
    }, 
    description: {
        type: String
    }, 
    status: {
        type: Boolean,
        default: false
    }, 
    due_date: {
        type: Date,
        default: Date.now
    },
    owner: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }
})

const Todo = model('Todo', todoSchema)

module.exports = Todo