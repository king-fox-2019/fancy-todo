const Todo = require('../models/todo')
const toUpdate = require('../helpers/updateField')

class TodoController {

    static addTask(req, res, next) {
        if (!req.body || !req.body.title) {
            next({ status: 400, message: 'Input cannot be empty.' })
        } else {
            console.log(req.body, req.loggedUser.id);
            let { title, description, dueDate } = req.body,
                UserId = req.loggedUser.id,
                projectId = req.params.projectId
            Todo.create({
                title: title,
                description: description,
                dueDate: dueDate,
                UserId: UserId,
                projectId
            })
                .then(todo => {
                    res.status(201).json({ todo, message: `success added list` })
                })
                .catch(next)
        }
    }

    static find(req, res, next) {
        Todo.find({
            UserId: req.loggedUser.id

        })
            .populate("UserId")
            .sort({ createdAt: -1 })
            .then(todos => {
                if (todos.length === 0) throw ({ status: 200, message: "You don't have any task." })
                else {
                    console.log(todos)
                    res.status(200).json(todos)
                }
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }

    static findOne(req, res, next) {
        Todo.findById(req.params.id)
            .then(todo => {
                if (!todo) throw ({ status: 404, message: "Not found." })
                else {
                    console.log(todo)
                    res.status(200).json(todo)
                }
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }

    static updateField(req, res, next) {
        console.log('masuk');
        console.log(req.params);
        let dataChanged = toUpdate(['title', 'description', 'dueDate', 'status'], req.body)
        console.log(dataChanged);
        Todo.findByIdAndUpdate(
            req.params.id,
            {
                $set: dataChanged
            },
            {
                new: true,
                omitUndefined: true
            }
        )
            .then(todo => {
                res.status(201).json({ todo, message: 'success updated task' })
            })
            .catch(next)
    }

    static delete(req, res, next) {
        Todo.findByIdAndRemove(req.params.id)
            .then(success => {
                res.status(200).json({ success, message: 'success deleting task' })
            })
            .catch(next)
    }

    static findByQuery(req, res, next) {
        let obj = {}
        if (req.query) {
            let arr = []
            let field = Object.keys(req.query)
            field.forEach((q) => {
                arr.push({
                    [q]: { $regex: new RegExp(req.query[q], "i") }
                })
            })
            if (arr.length > 0) {
                obj = { $or: arr }
            }
        }
        Todo.find(obj)
            .populate(['userId', 'projectId'])
            .then(founded => {
                res.status(200).json(founded)
            })
            .catch(next)
    }

}

module.exports = TodoController