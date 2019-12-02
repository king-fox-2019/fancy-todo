const mongoose = require('mongoose')
const { Schema, model } = mongoose

const ProjectSchema = new Schema({
    name : {
        type : String,
        required : [true, 'name is required!'],
        unique: true
    },
    owner : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        role : {
            type : String,
            default : 'owner'
        }
    },
    members : [{
        type : Schema.Types.ObjectId,
        ref : 'User',
        role : {
            type : String,
            default : 'member'
        }
    }]
},{
    versionKey : false,
    timestamps : true
})

module.exports = model('Project',ProjectSchema)