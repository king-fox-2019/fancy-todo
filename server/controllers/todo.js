const Todo = require('../models/todo')

class TodoController{
    static createTodo(req,res,next){
        Todo.create({
            title: req.body.title,
            desc: req.body.desc,
            dueDate: req.body.duedate,
            creator: req.decoded.id || req.user.id
        })
        .then(todo => {
            res.status(201).json(todo)
        })
        .catch(err => {
            next(err)
        })
    }

    static getAllTodo(req,res,next){
        Todo.find()
            .then(todos => {
                res.status(200).json(todos)
            })
            .catch(err => {
                next(err)
            })
    }

    static getOneTodo(req,res,next){
        Todo.findOne({_id: req.params.id})
            .then(todo => {
                res.status(200).json(todo)
            })
            .catch(err => {
                next(err)
            })
    }

    static getUserTodo(req,res,next){
        Todo.find({creator: req.decoded.id})
            .then(todos => {
                let newTodos = []
                todos.forEach(todo => {
                    if(todo.projectId == null || todo.projectId == undefined){
                        newTodos.push(todo)
                    }
                });
                res.status(200).json(newTodos)
            })
            .catch(err => {
                next(err)
            })
    }

    static editTodoStatus(req,res,next){
        Todo.findOne({_id: req.params.id})
            .then(todo => {
                if(todo.status == 'Done'){
                    next({
                        status: 400,
                        message: 'You have done this task'
                    })
                }else{
                    return Todo.findOneAndUpdate({_id: req.params.id},{
                        status: 'Done'
                    })
                }
            })
            .then(todo => {
                res.status(200).json({
                    message: 'Update Success'
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static editContentTodo(req,res,next){
        Todo.findOneAndUpdate({_id: req.params.id},{
            title: req.body.title,
            desc: req.body.desc
        })
        .then(todo => {
            res.status(200).json({
                message: 'Update Success'
            })
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteTodo(req,res,next){
        console.log('masuk delete')
        Todo.deleteOne({
            _id: req.params.id
        })
        .then(success => {
            res.status(200).json({
                message: 'Delete Success'
            })
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = TodoController