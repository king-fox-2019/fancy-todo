const Invitation = require('../models/Invitation');
const Project = require('../models/Project');
const User = require('../models/User');

class InvitationController {
    static showAll(req, res, next) {
        Invitation
            .find({
                isAccepted: false
            })
            .populate('project')
            .populate('sender', 'name')
            .populate('recipient', 'name')
            .then( datas => {
                let asSender = datas.filter(function(item) {
                    return item.sender._id == req.decoded.id;
                });
                let asRecipient = datas.filter(function(item) {
                    return item.recipient._id == req.decoded.id;
                });
                
                let result = {
                    asSender,
                    asRecipient
                }
                console.log(result)
                res.status(200).json(result);
            })
            .catch( err => {
                next(err);
            })
    }

    static acceptInvitation(req, res, next) {
        let recipient, project;
        Invitation
            .findOneAndUpdate({
                _id: req.params.id
            },{
                isAccepted: true
            })
            .populate('recipient', 'email')
            .then(data => {
                recipient = data.recipient;
                project = data.project;

                return Project.findOneAndUpdate({
                    _id: project
                },{
                    $addToSet: { members: recipient._id }
                })
            })
            .then(data => {
                return Project.findOneAndUpdate({
                    _id: project
                },{
                    $pull: { pendingMembers: recipient.email }
                },{
                    returnOriginal: false
                })
            })
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => {
                next(err);
            })
    }

    static declineInvitation(req, res, next) {
        Invitation
            .findOneAndDelete({_id: req.params.id})
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => {
                next(err);
            })
    }

    static bulkCreateInvitations(req, res, next) {
        let arrToInsert = [];
        let { ProjectId, member } = req.body;
        User.find({
            email: { $in: JSON.parse(member)}
        })
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                let newObj = {
                    project: ProjectId,
                    sender: req.decoded.id,
                    recipient: data[i]._id,
                    isAccepted: false
                }
                arrToInsert.push(newObj);
            }
            return Invitation.insertMany(arrToInsert)   
        })
        .then(invitations => {
            res.status(201).json(invitations)
        })
        .catch(err => {
            next(err);
        })
    }
}

module.exports = InvitationController;