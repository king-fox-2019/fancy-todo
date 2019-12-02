const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    title : {
        type : String,
        required : [true, 'Title is required']
    },
    description : {
        type : String
    },
    status : {
        type : String,
        default : 'incomplete'
    },
    createdAt : {
        type : Date,
        default : new Date(),
        timestamps: true
    },
    dueDate : {
        type : Date,
        required: true,
        default : null,
        validate: {
            validator() {
                if (this.dueDate < this.createdAt) {
                    return false
                }
            },
            message: 'Due date should be later than created date'
        },
        timestamps: true
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    projectId : {
        type : Schema.Types.ObjectId,
        ref : 'Project'
    }
})

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;