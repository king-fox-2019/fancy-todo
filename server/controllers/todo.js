const Todo = require('../models/Todo');

class TodoController {
    static showOne(req, res, next) {
        Todo
            .findById(req.params.id)
            .then( data => {
                res.status(200).json(data)
            })
            .catch( err => {
                next(err)
            })
    }

    static updateOne(req, res, next) {
        Todo
            .findOneAndUpdate({_id: req.params.id}, req.body)
            .then(data => {
                res.status(201).json(data)
            })
            .catch( err => {
                next(err)
            })
    }

    static updateStatus(req, res, next) {
        let updateTo = (req.body.status == 'false') ? true : false;
        Todo
            .findOneAndUpdate({_id: req.params.id}, {status: updateTo})
            .then( data => {
                res.status(201).json(data)  
            })
            .catch( err => {
                next(err)
            })
    }

    static deleteOne(req, res, next) {
        Todo
            .findByIdAndRemove({_id: req.params.id})
            .then( data => {
                console.log(data)
                res.status(201).json(data)  
            })
            .catch( err => {
                next(err)
            })
    }
}

module.exports = TodoController;