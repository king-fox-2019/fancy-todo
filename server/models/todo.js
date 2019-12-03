const mongoose = require('mongoose')
const { Schema, model } = mongoose

const TodoSchema = new Schema({
    title : {
        type: String,
        required: [true, 'title is required!'] 
    },
    description : {
        type: String,
        required: [true, 'description is required!'] 
    },
    status : {
        type: Boolean,
    },
    UserId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    due_date : {
        type : Date,
        required: [true, 'due date is required!'] 
    },
    projectId : {
        type : Schema.Types.ObjectId,
        ref : 'Project'
    }
},{
    versionKey : false,
    timestamps : true
})

TodoSchema.pre('save',function(next){
    if(this.due_date < new Date()){
        throw {
            status : 400,
            message : 'due_date iscorrect!'
        }
    } else  {
        this.status = false
        next()
    }
})

module.exports = model('Todo',TodoSchema)