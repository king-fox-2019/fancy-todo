const Project = require('../models/Project.js');
const Todo = require('../models/Todo.js');
const User = require('../models/User.js');
const sendMail = require('../helpers/nodemailer.js');

console.log('=== Project Controller ===')

class ProjectController {
    static create(req, res, next) {
        console.log('create()');
        console.log('req.body => ',req.body);
        console.log('req.decoded.id ', req.decoded.id)
        
        Project.create({
            name : req.body.name,
            creator : req.decoded.id,
            members : [req.decoded.id]
        })
            .then((data) => {
                console.log('data => ',data);
                res.status(201).json(data)
            })
            .catch(next)
    }

    static showAll(req, res, next) {
        console.log('static showAll()');
        console.log('req.decoded.id => ',req.decoded.id);
        Project.find({ members : { $in : req.decoded.id}})
            .populate({
                path : 'todoList',
                model : 'Todo',
                populate : {
                    path : 'userId',
                    model : 'User'
                }
            })
            .populate('members')
            .populate('pendingMembers')
            .populate('creator')
            .then((projects) => {
                console.log('projects => ',projects)
                res.status(200).json(projects)
            })
            .catch(next)
    }

    static showOne(req, res) {
        console.log('showOne()')
        console.log('req.body => ',req.body);
        Project.findById(req.params.id)
            .populate({
                path : 'todoList',
                model : 'Todo',
                populate : {
                    path : 'userId',
                    model : 'User'
                }
            })
            .populate('members')
            .populate('pendingMembers')
            .populate('createdBy')
            .then((projects) => {
                console.log('projects => ',projects);
                res.status(200).json(projects)
            })
            .catch(next)
    }

    static delete(req, res, next) {
        console.log('delete()');
        console.log('req.body => ',req.body);
        
        Project.findByIdAndDelete({ _id : req.params.id })
            .then((data) => {
                return Todo.deleteMany({ projectId : data._id })
            })
            .then((result) => {
                res.status(200).json(result)
            })
            .catch(next)
    }

    static addProjectsTodo(req, res, next) {
        console.log('addProjectsTodo');
        console.log('req.body => ',req.body);

        let {title, description, dueDate, dueTime, projectId } = req.body
        User.findOne({ email : req.body.email})
            .then((user) => {
                console.log('user => ',user)
                return Todo.create({
                    title, description, dueDate, dueTime, projectId, userId : user._id
                })
            })
            .then((data) => {
                return Project.findByIdAndUpdate({
                        _id : req.params.id
                    }, {
                        $push : { todoList : data._id}
                    })
                
            })
            .then((result) => {
                console.log('result => ',result)
                res.status(201).json(result)
            })
            .catch(next)
    }

    static inviteMember(req, res, next) {
        console.log('inviteMember');
        console.log('req.body => ',req.body);
        console.log('req.params.id => ',req.params.id);
        let foundUser;
        
        User.findOne({ email : req.body.email })
            .then((user) => {
                foundUser = user
                console.log('foundUser => ',foundUser);
                return Project.findById(req.params.id)
            })
            .then((project) => {
                console.log('project => ',project)
                let checkMember = project.members.indexOf(foundUser._id) < 0
                let checkPendingMember = project.pendingMembers.indexOf(foundUser._id) < 0
                if (checkMember && checkPendingMember) {
                     return Project
                                .findByIdAndUpdate({ _id : req.params.id}, { $push : { pendingMembers : foundUser._id}})
                } else if (!checkMember) {
                     res.status(400).json({msg : 'user already a member'})
                } else if (!checkPendingMember) {
                     res.status(400).json({msg : 'user already invited'})
                }
            })
            .then((result) => {
                var mailOptions = {
                    from: process.env.EMAIL,
                    to: req.body.email,
                    subject: `Fancy To-do Project's Invitation`,
                    text: "You have one project's invitation from Fancy-Todo, please Sign In to respond!"
                };
                sendMail(mailOptions);
                console.log('result => ',result)
                res.status(200).json(result)
            })
            .catch(next)
    }

    static showPendingMember(req, res, next) {
        console.log('showPendingMember');
        Project.find({ pendingMembers : { $in : req.decoded.id} })
            .then((data) => {
                console.log('data => ',data);
                res.status(200).json(data)
            })
            .catch(next)
    }

    static joinProject(req, res, next) {
        Project
            .findByIdAndUpdate({_id : req.params.id},{
                $pull : { pendingMembers : req.decoded.id },
                $push : { members : req.decoded.id}
            })
            .then((data) => {
                console.log('data => ',data);
                res.status(200).json(data)  
            })
            .catch(next)
    }

    static declineProject(req, res, next) {

        Project.findByIdAndUpdate({_id : req.params.id},{
            $pull : { pendingMembers : req.decoded.id }
        })
            .then((data) => {
                console.log('data => ',data);
                res.status(200).json(data)  
            })
            .catch(next)
    }

    static update(req, res, next) {
        console.log('update()');
        console.log('req.params.id => ',req.params.id);
        console.log('req.body => ',req.body);
        
        Project.findByIdAndUpdate({_id : req.params.id}, req.body)
            .then((data) => {
                console.log('data => ',data);
                res.status(200).json(data)  
            })
            .catch(next)
    }
}

module.exports = ProjectController