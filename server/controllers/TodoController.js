const Todo = require('../models/todo')

class TodoController {
  static create(req, res, next) {
    let objTodo = {
      title: req.body.title,
      description: req.body.description,
      status: false,
      dueDate: req.body.dueDate,
      user_id: req.loggedUser.id,
      project_id: req.body.project_id
    }
    Todo.create(objTodo)
      .then(result => {
        res.status(201).json(result)
      })
      .catch(err => {
        next(err)
      })
  }

  static findAll(req, res, next) {
    Todo.find({ user_id: req.loggedUser.id })
      .populate('User')
      .then(todos => {
        res.status(200).json(todos)
      })
      .catch(next)
  }

  static findOne(req, res, next) {
    console.log(req.params.id)
    Todo.findById(req.params.id)
      .then(todo => {
        if(todo != null) {
          res.status(200).json(todo)
        } else {
          next({status: 404, message: "Data not found"})
        }
      })
      .catch(next)
  }

  static updateField(req, res, next) {
    let { id } = req.params
    let objUpdate = {
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate
    }
    Todo.findByIdAndUpdate(id, { $set: objUpdate }, { omitUndefined: true, new: true })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }

  static updateStatus(req, res, next) {
    let { id } = req.params
    let { status } = req.body
    Todo.updateOne({ _id: id }, { status })
      .then(_ => {
        console.log(_);
        res.status(200).json({ message: 'status updated' })
      })
      .catch(next)
  }

  static deleteTodo(req, res, next) {
    let { id } = req.params
    Todo.deleteOne({ _id: id })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
}

module.exports = TodoController