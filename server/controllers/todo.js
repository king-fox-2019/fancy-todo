const Todo = require('../models/Todo')

class ControllerTodo {
  static getAll(req, res, next) {
    Todo
      .find({ user: req.loggedUser.id })
      .then(todos => {
        res.status(200).json(todos)
      })
      .catch(next)
  }

  static add(req, res, next) {
    const { title, description, dueDate } = req.body
    Todo
      .create({
        title, description, dueDate, completed: false, user: req.loggedUser.id, important: false
      })
      .then(todo => {
        res.status(200).json({
          message: 'Added a new task!',
          todo
        })
      })
      .catch(next)
  }

  static getOne(req, res, next) {
    Todo
      .findOne({ _id: req.params.id, user: req.loggedUser.id })
      .then(todo => {
        res.status(200).json(todo)
      })
      .catch(next)
  }

  static delete(req, res, next) {
    Todo
      .findByIdAndDelete(req.params.id)
      .then(todo => {
        res.status(200).json(todo)
      })
      .catch(next)
  }

  static update(req, res, next) {
    const { title, description, completed, dueDate, important } = req.body
    Todo
      .findByIdAndUpdate(req.params.id, {
        title, description, completed, dueDate, important
      }, {
        omitUndefined: true
      })
      .then(todo => {
        res.status(200).json(todo)
      })
      .catch(next)
  }

  static complete(req, res, next) {
    let completed
    Todo
      .findById(req.params.id)
      .then(todo => {
        if (todo.completed) {
          completed = false
        } else {
          completed = true
        }
        return Todo
          .findByIdAndUpdate(req.params.id, { completed })
      })
      .then(todo => {
        res.status(200).json(todo)
      })
      .catch(next)
  }

  static markImportant(req, res, next) {
    let important
    Todo
      .findById(req.params.id)
      .then(todo => {
        if (todo.important) {
          important = false
        } else {
          important = true
        }
        return Todo
          .findByIdAndUpdate(req.params.id, { important })
      })
      .then(todo => {
        res.status(200).json(todo)
      })
      .catch(next)
  }
}

module.exports = ControllerTodo