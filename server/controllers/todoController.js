const Todo = require('../models/todo')
let mongoose = require('mongoose')
const sendEmail = require('../helpers/sendEmail')

class todoController {
    static addTodo = (req,res,next) => {
        Todo.create({
            name:req.body.name,
            description:req.body.description,
            status:false,
            dueDate:req.body.dueDate,
            userId:req.body.userId
        })
        .then(result=>{
            sendEmail(req.body.userEmail,req.body.name,req.body.description,req.body.dueDate)
            res.status(201).json(result)
        })
        .catch(err=>{
            next(err)
        })
    }
    static getTodo = (req,res,next) => {
        Todo.find({})
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            next(err)
        })
    }
    static getDetail = (req,res,next) => {
        Todo.findById(req.query.id)
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            next(err)
        })
    }
    static deleteTodo = (req,res,next) => {
        Todo.deleteOne({_id:mongoose.Types.ObjectId(req.body.id)})
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            next(err)
        })
    }
    static updateTodo = (req,res,next) => {
        let id = mongoose.Types.ObjectId(req.body.id)
        Todo.updateOne({_id:id},{
            name:req.body.name,
            description:req.body.description,
            status:req.body.status,
            dueDate:req.body.dueDate
        })
        .then(result=>{
            res.status(201).json(result)
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = todoController