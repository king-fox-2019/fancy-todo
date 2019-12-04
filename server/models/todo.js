const mongoose = require('mongoose')
const Schema = mongoose.Schema
var ONE_HOUR = 60 * 60 * 1000; /* ms */

const TodoSchema = new Schema({
    title : {
        type: String,
        required: [true, 'Title is required'],
    },
    description : {
        type: String,
    },
    status :{
        type: Boolean,
        default : false
    },
    date : {
        type: Date,
        required: [true, 'Date is required'],
        min : new Date().setDate(new Date().getDate())
    },
    userId : {
        type: Schema.Types.ObjectId,
        ref : 'User'
    },
    projectId : {
        type: Schema.Types.ObjectId,
        ref : 'Project',
        default : null
    },
    assignee : {
        type: Schema.Types.ObjectId,
        ref : 'User',
    },
    starred : {
        type: Boolean,
        default: false
    }
})

const Todo = mongoose.model('Todo',TodoSchema)

module.exports = Todo