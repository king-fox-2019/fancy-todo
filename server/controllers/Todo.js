const { decodeToken } = require('../helpers/jwt')
const toUpdate = require('../helpers/toUpdate')
const Todo = require('../models/Todo')

class TodoController {

    static getTodos(req, res, next) {
       
        const { id } = decodeToken(req.headers.access_token)
       
        Todo.find({
            owner: id
        })
            .then(todos => {
                if (todos.length === 0) {
                    throw ({
                        name:`Empty`,
                        message: `Your Todo list is empty.`
                    })
                } else {
                    res.status(200).json(todos)
                }
            })
            .catch(next)
    }

    static addTodo(req, res, next) {
      
        const {name, description, due_date} = req.body
        const { id:owner } = decodeToken(req.headers.access_token)
        
        Todo.create({
            name,
            description,
            owner,
            due_date
        })
            .then(todo => {
                res.status(201).json(todo)
            })
            .catch(next)
    }

    static deleteTodo(req, res, next) {
        
        Todo.deleteOne({
            _id: req.params.id
        })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(next)

    }

    static updateTodo(req, res, next) {
        
        const setValue = toUpdate(
                ['name', 'description', 'status', 'due_date'], 
                req.body
            )
            
        Todo.updateOne( { _id:req.params.id } , setValue )
            .then(result => {
                res.status(200).json(result)
            })
            .catch(next)

    }

}

module.exports = TodoController