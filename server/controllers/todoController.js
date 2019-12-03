const Todo = require('../models/todo')
const Project = require('../models/project')
const User = require('../models/user')


class TodoController {

    static create(req,res,next){
        // console.log(newDate)
        Todo.create({
            title : req.body.title,
            description : req.body.description,
            date : req.body.date,
            userId : req.loggedUser.id,
            assignee : req.loggedUser.id
        })
        .then(todo => {
            res.status(201).json(todo)
        })
        .catch(err => {
            next({
                status : 400,
                message : err
            })
        })
    }

    static findAll(req,res,next){
        Todo.find({
            assignee : req.loggedUser.id
        })
        .populate('userId')
        .populate('assignee')
        .populate({
            path: "projectId",
            populate: {
                path: "members",
                select : ["name", "profilePicture"]
            }
        })
        .then(todos => {
            res.status(200).json(todos)
        })
        .catch(next)
    }


    static findOne(req,res,next){
        console.log('from find one ==========')
        Todo.findOne({
            _id : req.params.id
        })
        // .populate('projectId')
        .populate('assignee')
        .populate({
            path: "projectId",
            populate: {
                path: "members",
                select : ["name", "profilePicture","email"]
            }
        })
        .then(todos => {
            res.status(200).json(todos)
        })
        .catch(next)
    }

    static delete(req,res,next){
        Todo.findOneAndDelete({
            _id : req.params.id
        })
        .then(todo => {
            console.log(todo)
            return Project.findOneAndUpdate({ _id : todo.projectId},
                { $pull: { todos:{  $in: todo._id } }},{new: true})
                .catch(err => {
                    console.log(err)
                })
        })
        .then(project => {
           res.status(201).json({message :`delete todo success` })
        })
        .catch(next)
    }

    static update(req,res,next){
        // console.log('step one')
        console.log(req.body.assignee,'-------------------')
        let assignee = ''
        if(req.body.date === ''){
            req.body.date === new date()
        }
        User.findOne({
            name : req.body.assignee
        })
        .then(user => {
            console.log('step two')
            if(user){
                assignee = user._id
            }else{
                assignee = req.loggedUser.id
            }
            return Todo.findOneAndUpdate({ _id : req.params.id},{
                title : req.body.title,
                description : req.body.description,
                date : req.body.date,
                userId : req.loggedUser.id,
                assignee : assignee
            })
        })
        .then(todo => {
            res.status(201).json({ message : 'update success'})
        })
        .catch(next)
    }

    static updateStatus(req,res,next){
        Todo.findOne({
            _id: req.params.id
        })
        .then(todo => {
            console.log(todo)

            if(todo.status == true){
                return Todo.findOneAndUpdate({ _id : req.params.id},{ 
                    status : false
                },{new: true})
            }else{
                return Todo.findOneAndUpdate({ _id : req.params.id},{ 
                    status : true
                },{new: true})
            }
        })
        .then(todo => {
            res.status(201).json(todo)
        })
        .catch(next)
    }

    static updateStarred(req,res,next){
        Todo.findOne({
            _id: req.params.id
        })
        .then(todo => {
            console.log(todo)
            if(todo.starred == true){
                return Todo.findOneAndUpdate({ _id : req.params.id},{ 
                    starred : false
                },{new: true})
            }else{
                return Todo.findOneAndUpdate({ _id : req.params.id},{ 
                    starred : true
                },{new: true})
            }
        })
        .then(todo => {
            res.status(201).json(todo)
        })
        .catch(next)
    }

    static findOnProgress(req,res,next){
        Todo.find({
            assignee : req.loggedUser.id,
            status : false
        })
        .populate('userId')
        .populate('assignee')
        .populate({
            path: "projectId",
            populate: {
                path: "members",
                select : ["name", "profilePicture","email"]
            }
        })
        .then(todos => {
            res.status(200).json(todos)
        })
        .catch(next)
    }

    static findDone(req,res,next){
        Todo.find({
            assignee : req.loggedUser.id,
            status : true
        })
        .populate('userId')
        .populate('assignee')
        .populate({
            path: "projectId",
            populate: {
                path: "members",
                select : ["name", "profilePicture","email"]
            }
        })
        .then(todos => {
            res.status(200).json(todos)
        })
        .catch(next)
    }

    static findStarred(req,res,next){
        Todo.find({
            assignee : req.loggedUser.id,
            starred : true
        })
        .populate('userId')
        .populate('assignee')
        .populate({
            path: "projectId",
            populate: {
                path: "members",
                select : ["name", "profilePicture","email"]
            }
        })
        .then(todos => {
            res.status(200).json(todos)
        })
        .catch(next)
    }
}

module.exports = TodoController