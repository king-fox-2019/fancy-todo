const Todo = require('../models/todo')

class TodoController {

    static create(req, res, next) {
        const userId = req.loggedUser._id
        const status = 'pending'
        const { title, description, dueDate } = req.body

        Todo.create({ title, description, dueDate, userId, status })
            .then(todo => {
                res.status(200).json(todo)
            })
            .catch(next)
    }

    static createTodoProject(req, res, next) {
        const projectId = req.params.projectId
        const userId = req.loggedUser._id
        const status = 'pending'
        const { title, description, dueDate } = req.body

        Todo.create({ title, description, dueDate, userId, status, projectId })
            .then(todo => {
                res.status(200).json(todo)
            })
            .catch(next)
    }

    static showAllUserTodos(req, res, next) {
        const userId = req.loggedUser._id
        Todo.find({userId, projectId: null})
            .then(todos => {
                res.status(200).json(todos)
            })
            .catch(next)
    }

    static showAllProjectTodos(req, res, next) {
        const projectId = req.params.projectId
        Todo.find({projectId})
            .populate('projectId')
            .then(todos => {
                res.status(200).json(todos)
            })
            .catch(next)
    }

    static showTodo(req, res, next) {
        const todoId = req.params.todoId
        Todo.findById(todoId)
            .then(todo => {
                res.status(200).json(todo)
            })
            .catch(next)
    }

    static doneUndone(req, res, next) {
        const _id = req.params.todoId
        let status = 'done'
        Todo.findById(_id)
            .then(todo => {
                if (todo.status == 'done') status = 'pending'
                return Todo.findByIdAndUpdate({_id}, {status}, {new: true})
            })
            .then(todo => {
                res.status(200).json(todo)
            })
            .catch(next)
    }

    static update(req, res, next) {
        console.log('masuk')
        const obj = req.body
        console.log(obj)
        const _id = req.params.todoId
        Todo.findByIdAndUpdate({_id}, obj, {new: true})
            .then(todo => {
                res.status(200).json(todo)
            })
            .catch(next)
    }

    static delete(req, res, next) {
        const _id = req.params.todoId
        Todo.findByIdAndDelete({_id})
            .then(() => {
                res.status(200).json({message: 'delete success'})
            })
            .catch(next)
    }
    
}

module.exports = TodoController