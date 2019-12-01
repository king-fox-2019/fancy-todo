const Todo = require('../models/Todo')
class TodoController{
    static TodoPerson(req, res, next){
        const {user} = req.params
        Todo.find({user}).then(todo => {
            res.status(200).json(todo)
        }).catch(next)
    }
    static addTodo(req, res, next){
        const {user} = req.params
        const status = false
        const {title, description, dueDate} = req.body      
        Todo.create({title, description, dueDate, status, user}).then(todo =>{
            res.status(201).json(todo)
        }).catch(next)
    }
    static deleteTodo(req, res, next){
        const {user} = req.params
        const {id} = req.body      
        Todo.deleteOne({_id : id}).then(todo =>{
            res.status(200).json(todo)
        }).catch(next)
    }
    static updateTodo(req, res, next){
        const {user} = req.params
        const {id, title, description, dueDate} = req.body      
        Todo.updateOne({_id : id}, {title, description, dueDate}).then(data=>{
            res.status(200).json(data)
        }).catch(next)
    }
    static checkTodo(req, res,next){
        const {user} = req.params
        const {id, status} = req.body      
        Todo.updateOne({_id : id}, {status}).then(data=>{
            res.status(200).json(data)
        }).catch(next)
    }
}
module.exports = TodoController