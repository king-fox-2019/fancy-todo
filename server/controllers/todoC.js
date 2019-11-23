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
      .catch(next)
  }

  static getOneTodo(req, res, next) {
    Todo.findById(req.params.id)
      .populate({ path: 'creator', select: 'username email -_id' })
      .then(todo => {
        res.status(200).json({
          data: {
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
      .catch(next)
  }

  static editTodo(req, res, next) {
    Todo.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        dueDate: req.body.dueDate
      },
      { new: true, omitUndefined: true, runValidators: true }
    )
      .populate({ path: 'creator', select: 'username email -_id' })
      .then(todo => {
        res.status(200).json({
          message: 'Todo updated',
          data: {
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
      .catch(next)
  }

  static updateStatus(req, res, next) {
    Todo.findById(req.params.id)
      .then(todo => {
        todo.status =
          todo.status == 'pending'
            ? 'done'
            : todo.status == 'done'
            ? 'pending'
            : todo.status

        return todo.save()
      })
      .then(todo => {
        res.status(200).json({
          message: `Todo status changed to ${todo.status}`,
          data: {
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
      .catch(next)
  }

  static deleteTodo(req, res, next) {
    Todo.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(200).json({
          message: 'Todo deleted'
        })
      })
      .catch(next)
  }
}

module.exports = TodoController
