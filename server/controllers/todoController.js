
const Todo = require('../models/Todo')
const User = require('../models/User')

class TodoController {

   static createTodo(req, res, next) {
      
      req.body.user = req.decoded.userId
      console.log(req.body)
      Todo.create(req.body)
      .then(todo => {
         res.status(201).json({message: 'Todo created', todo})
      })
      .catch(next)
   }

   static todoList(req, res, next) {
      
      Todo.find({user: req.decoded.userId})
      .then(todos => {
         res.status(200).json(todos)
      })
      .catch(next)
   }

   static updateTodo(req, res, next) {
      
      Todo.updateOne({_id: req.params.id}, {$set: req.body}, {omitUndefined: true})
      .then(() => res.status(200).json({message: `Update success`}))
      .catch(next)
   }

   static deleteTodo(req, res, next) {
      console.log('id', req.params.id)
      Todo.deleteOne({_id: req.params.id})
      .then(() => res.status(200).json({message: `Delete success`}))
      .catch(next)
   }
}

module.exports = TodoController