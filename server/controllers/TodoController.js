const Todo = require('../models/Todo.js');

console.log('=== Todo Controller ===')

class TodoController {
    static create (req, res, next) {
        console.log('static create()')
        Todo.create(req.body)
            .then((data) => {
                res.status(201).json(data)
            })
            .catch(next)
    }

    static showAll (req, res, next) {
        console.log('static showAll()')
        console.log('req.decoded.id => ',req.decoded.id)
        Todo.find({ userId : req.decoded.id })
            .then((data) => {
                console.log('data => ',data)
                res.status(200).json(data)
            })
            .catch(next)
    }

    static showOne(req, res, next) {
        console.log('static showOne()');
        console.log('req.params.id => ',req.params.id)
        Todo.findById(req.params.id)
            .then((data) => {
                console.log('data => ',data)
                res.status(200).json(data)
            })
            .catch(next)
    }

    static update (req, res, next) {
        console.log('static update()');
        console.log('req.body => ',req.body);
        console.log('req.params.id => ',req.params.id);
        
        Todo.findByIdAndUpdate(req.params.id, req.body)
            .then((data) => {
                console.log('data => ',data)
                res.status(200).json(data)
            })
            .catch(next)
    }

    static delete (req, res, next) {
        console.log('static delete()')
        console.log('req.params.id => ',req.params.id)

        Todo.deleteOne({ _id : req.params.id })
            .then((data) => {
                console.log('data => ',data)
                res.status(200).json(data)
            })
            .catch(next)
    }
}

module.exports = TodoController