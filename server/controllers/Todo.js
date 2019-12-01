const Todo = require('../models/todo')

class TodoController {
    static all(req, res, next) {
        Todo.find({user: req.logged._id})
            .populate({
                path: 'user',
                select: ['name', 'email']
            })
            .then(todos => {
                res.status(200).json(todos)
            })
            .catch(err => {
                next(err)
            }) 
    }
    static create(req, res, next) {
        let { name, description, status, due_date } = req.body
        let id = req.logged._id
        Todo.create({ name, description, status, due_date, user: id })
            .then(todo => {
                res.status(201).json(todo)
            })
            .catch(err => {
                next(err)
            }) 
    }
    static destroy(req, res, next) {
        let idToDestroy = req.params.id
        Todo.deleteOne({_id: idToDestroy})
            .then(destroyed => {
                res.status(200).json(destroyed)
            })
            .catch(err => {
                next(err)
            }) 
    }
    static done(req, res, next) {
        let idDone = req.params.id
        Todo.updateOne({_id: idDone}, {status: "completed"})
            .then(updated => {
                res.status(200).json(updated)
            })
            .catch(err => {
                next(err)
            }) 
    }
}

module.exports = TodoController