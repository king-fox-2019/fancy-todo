const { Todo } = require('../models')

class TodoController {
  static createTodo(req, res, next) {
    Todo.create({
      creator: req.payload.id,
      name: req.body.name,
      description: req.body.description,
      dueDate: new Date(req.body.dueDate)
    })
      // .then(todo => {
      //   return todo.populate('creator', 'username email -_id').execPopulate()
      // })
      .then(todo => {
        res.status(201).json({
          message: 'Todo created',
          data: {
            name: todo.name,
            description: todo.description,
            dueDate: todo.dueDate,
            createdAt: todo.createdAt,
            status: todo.status
          }
        })
      })
      .catch(next)
  }

  static getAllUserTodos(req, res, next) {
    Todo.find({ creator: req.payload.id })
      .select('-__v')
      .populate({ path: 'creator', select: 'username email -_id' })
      .then(todos => {
        res.status(200).json({
          data: todos.map(todo => {
            return {
              _id: todo._id,
              name: todo.name,
              creator: todo.creator,
              description: todo.description,
              dueDate: todo.dueDate,
              updatedAt: todo.updatedAt,
              status: todo.status
            }
          })
        })
      })
  }
}

module.exports = TodoController
