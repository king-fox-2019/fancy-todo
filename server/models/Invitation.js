const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invitationSchema = new Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project"
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    recipient: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    isAccepted: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});

var Invitation = mongoose.model('Invitation', invitationSchema);

module.exports = Invitation;