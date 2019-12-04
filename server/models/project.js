const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
    
    title : {
        type: String,
        required : [true,'Title is required']
    },
    description : {
        type: String,
        required : [true,'Description is required']
    },
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    members : [{
        type : Schema.Types.ObjectId,
        ref : "User",
    }],
    pendingInvitation : [{
        type : Schema.Types.ObjectId,
        ref : "User"
    }],
    todos : [{
        type: Schema.Types.ObjectId,
        ref : "Todo"
    }]
})

const Project = mongoose.model('Project', ProjectSchema)


module.exports = Project