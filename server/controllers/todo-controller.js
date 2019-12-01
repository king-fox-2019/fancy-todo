const { Todo } = require('../models')


class TodoController {
  static getAllTodos (request, response, next) {
    Todo.find({ owner: request.user.id })
      .then(function (todos) {
        response.json(todos)
      })
      .catch(next)
  }

  static createTodo (request, response, next) {
    const { title, description } = request.body

    Todo.create({
      title,
      description,
      owner: request.user.id
    })
      .then(function (todo) {
        response.status(201).json({ message: 'success create new todo' })
      })
      .catch(next)
  }

  static putTodo (request, response, next) {
    const { title, description } = request.body
    const { todoId } = request.params

    Todo.updateOne({ _id: todoId }, { title, description })
      .then(function (result) {
        response.status(200).json({ message: 'success update todo' })
      })
      .catch(next)
  }

  static patchTodo (request, response, next) {
    const { title, description } = request.body
    const { todoId } = request.params

    Todo.updateOne({ _id: todoId }, { title, description })
      .then(function (result) {
        response.status(200).json({ message: 'success update todo' })
      })
      .catch(next)
  }

  static deleteTodo (request, response, next) {
    const { todoId } = request.params

    Todo.deleteOne({ _id: todoId })
      .then(function (result) {
        response.status(200).json({ message: 'success delete todo' })
      })
      .catch(next)
  }
}


module.exports = TodoController
