const mongoose = require('mongoose')


const TaskSchema = new mongoose.Schema({
    // CRUD endpoints untuk Todo (`name`, `description`, `status`, `due_date`)
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    due_date: {
        type: Date,
        min: [new Date().toLocaleDateString(), "Day has passed"]
    },
    status: {
        type: Boolean
    },
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('Task', TaskSchema)