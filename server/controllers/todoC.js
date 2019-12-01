const Task = require('../models/todo')
const { verify } = require('../helpers/token')


class Controller {

    static allTodo(req, res, next) {
        req.decode = verify(req.headers.id_token)
        console.log(req.decode);
        Task.find({ UserId: req.decode.email })
            .then((result) => {
                res.status(200).json(result)
            })
            .catch((next));
    }

    static makeOne(req, res, next) {
        req.decode = verify(req.headers.id_token)
        let { name, description, due_date } = req.body
        let status = false
        let UserId = req.decode.id
        Task.create({ name, description, due_date, status, UserId })
            .then((data) => {
                res.status(201).json(data)
            })
            .catch(next)
    }

    static someTodo(req, res, next) {
        req.decode = verify(req.headers.id_token)
        Task.find({ name: req.params.name, UserId: req.decode.id })
            .then((data) => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static update(req, res, next) {
        req.decode = verify(req.headers.id_token)

        const obj = {}
        for (const index in req.body) {
            if (req.body[index]) {
                obj[index] = req.body[index]
            }
        }

        Task.findByIdAndUpdate({ _id: req.params.id, UserId: req.decode.id }, obj)
            .then((result) => {
                res.status(200).json(result)
            }).catch((next));
    }

    static delete(req, res, next) {
        req.decode = verify(req.headers.id_token)
        Book.deleteOne({ _id: req.params.id, UserId: req.decode.id })
            .then((result) => {
                res.status(200).json(result)
            })
            .catch((next));
    }

    static done(req, res, next) {
        req.decode = verify(req.headers.id_token)
        let {id} = req.body
        let status = true      
        Todo.updateOne({_id : id, UserId: req.decode.id}, {status})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(next)
    }
}

module.exports = Controller