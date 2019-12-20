'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
const TodoSchema = new Schema({
    title: {
        type:String,
        required:[true,'you must enter your title']
    },
    description: String,
    dueDate: {
        type: Date,
        validate :{
            validator: function(v){
                let now = new Date().getTime()
                if(v.getTime() < now){
                    return false
                }else{
                    return true
                }
            },
            message : `dueDate is wrong input`
        }
    },
    status: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    } 
});

const Model = mongoose.model('Todo', TodoSchema)
module.exports = Model