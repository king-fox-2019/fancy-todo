const mongoose = require('mongoose');
const Schema = mongoose.Schema

const projectSchema = new Schema({
    title:{
        type: String,
        required: [true, 'Title cannot be empty']
    },
    task:[{
        type: Schema.Types.ObjectId,
        ref: 'Todo'
    }],
    creator:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    members:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project