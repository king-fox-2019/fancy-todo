const { Schema, model, models, } = require('mongoose')

const todoSchema = new Schema({
    name : {
        type : String,
        required : [true, "Name cannot be empty"]
    },
    description : String,
    status : String,
    dueDate : {
        type : Date,
        required: [true,"Due Date cannot be empty"]
    },
    UserId : { 
        type: Schema.Types.ObjectId , 
        ref: 'User',
        required: true
    }
})


const Todo = model('Todo', todoSchema)


module.exports = Todo