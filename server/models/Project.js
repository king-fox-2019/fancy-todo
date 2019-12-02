const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Project name is required']
	},
	members: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}],
	todoList: [{
		type: Schema.Types.ObjectId,
		ref: 'Todo'
	}],
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	pendingMembers: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}]
})

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;