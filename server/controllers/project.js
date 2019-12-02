const Project = require('../models/Project');
const Todo = require('../models/Todo');
const User = require('../models/User');
const Invitation = require('../models/Invitation');
const calendarAxios = require('../config/calendarAPI');

class ProjectController {
    static create(req, res, next) {
        const { name } = req.body;
        let createdProj = {};
        Project
            .create({
                name,
                owner: req.decoded.id,
                pendingMembers: req.body['members[]']
            })
            .then(data => {
                createdProj = data;
                return User.find({
                    email: { $in: data.pendingMembers}
                })
            })
            .then(users => {
                let arrToInsert = [];
                for (let i = 0; i < users.length; i++) {
                    let newObj = {
                        project: createdProj._id,
                        sender: req.decoded.id,
                        recipient: users[i]._id,
                        isAccepted: false
                    }
                    arrToInsert.push(newObj)
                }

                return Invitation.insertMany(arrToInsert);
            })
            .then(invitations => {
                res.status(201).json(createdProj);
            })
            .catch( err => {
                next(err);
            })
    }

    static showOne(req, res, next) {
        Project
            .findById(req.params.id)
            .populate('owner', 'email name')
            .populate('members', 'email name')
            .then( data => {
                res.status(200).json(data)
            })
            .catch( err => {
                err = {
                    status: 404,
                    msg: "Not found"
                }
                next(err);
            })
    }

    static showAll(req, res, next) {
        Project
            .find()
            .populate('owner', 'name email')
            .then( datas => {
                let owned = datas.filter(function(item) {
                    return item.owner._id == req.decoded.id;
                });

                let membersOf = datas.filter(function(item) {
                    return item.members.includes(req.decoded.id)
                })
                let result = [...owned, ...membersOf]

                res.status(200).json(result);
            })
            .catch( err => {
                next(err);
            })
    }

    static update(req, res, next) {
        let query;
        const { name, memberId } = req.body;
        if (name) {
            query = { name }
        } else {
            query = { $pull: { members: memberId }}
        }

        Project
            .findOneAndUpdate({_id: req.params.id}, query, {returnOriginal: false})
            .then( data => {
                res.status(200).json(data)
            })
            .catch( err => {
                next(err);
            })
    }

    static destroy(req, res, next) {
        Project
            .findOneAndDelete({_id: req.params.id})
            .then( data => {
                res.status(200).json(data)
            })
            .catch( err => {
                next(err);
            })
    }

    static createTodo(req, res, next) {
        const { name, description, dueDate } = req.body;
        let date = (!dueDate) ? null : new Date(dueDate);
        Todo
            .create({
                name,
                description, 
                dueDate: date, 
                project: req.params.id,
                user: req.decoded.id
            })
            .then( data => {
                res.status(201).json(data);
            })
            .catch( err => {
                next(err)
            })
    }

    static showAllTodos(req, res, next) {
        Todo
            .find({project: req.params.id})
            .populate('user', 'name email')
            .sort({updatedAt: -1})
            .then( data => {
                res.status(200).json(data);
            })
            .catch( err => {
                next(err)
            })
    }

    static addToCalendar(req, res, next) {
        const { token, name } = req.body;
        let calendarId;
        let date = new Date(req.body.date);
        let start = new Date(date);
        let end = new Date(date.setHours(date.getHours() + 1));
        
        calendarAxios({
            method: 'get',
            url: '/accounts/me/cal/calendars',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(({data}) => {
            calendarId = data.objects[0].id;
            return calendarAxios({
                method: 'post',
                url: `/accounts/me/cal/calendars/${calendarId}/events`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: {
                    name,
                    start,
                    end
                }
            })
        })
        .then(({data}) => {
            console.log({
                eventId: data.id,
                calendarId: data.calendar_id
            })
            res.status(200).json({
                eventId: data.id,
                calendarId: data.calendar_id
            })
        })
        .catch(next)
    }
}

module.exports = ProjectController;