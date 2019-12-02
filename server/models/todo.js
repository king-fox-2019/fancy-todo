const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    title:{
        type: String,
        required: [true, 'Title cannot be empty']
    },
    desc:{
        type: String,
        required: [true, 'Description cannot be empty']
    },
    status:{
        type: String,
        default: 'Pending'
    },
    dueDate:{
        type: Date
    },
    creator:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    projectId:{
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }
},
{
    versionKey: false,
    timestamps: true
})

todoSchema.pre('save', function(next){
    let newDate = new Date()
    if(this.dueDate < newDate){
        next({
            status: 500,
            message: 'Please select another day'
        })
    }else{
        next()
    }
})


const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo;