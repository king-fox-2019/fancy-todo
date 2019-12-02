const mongoose = require('mongoose')
const { Schema } = mongoose

const projectSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is required']
    },
    description: String,
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    members: [
        {userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
                }, 
        status: String
    }],
    todos: [{
        type: Schema.Types.ObjectId,
        ref: 'Todo'
    }]
}, {timestamps: true, versionKey: false})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project