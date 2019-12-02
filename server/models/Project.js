const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Todo = require('../models/Todo');

const projectSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name can not be empty']
    },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    pendingMembers: {
        type: Array
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{
    timestamps: true
});

projectSchema.pre('findOneAndDelete', async function (doc, next) {
    var project = doc;
    await Todo.deleteMany(
        { project: project._id }
    );
    next
});

var Project = mongoose.model('Project', projectSchema);

module.exports = Project;