const Todo = require('../models/Todo')

class TodoController {


  static findAll(req, res, next) {
    let userId = req.loggedUser._id
    Todo.find({userId})
      .then(todos => {
        res.status(200).json( todos )
      })
      .catch(next)
  }

  static findOne(req, res, next) {
    let id = req.params.id
    Todo.findById(id)
      .then(todo => {
        res.status(200).json({ todo })
      })
      .catch(next)
  }

  static create(req, res, next) {
    let { title, description, dueDate } = req.body
    Todo.create({ title, description, userId : req.loggedUser.id, dueDate})
      .then(todo => {
        res.status(201).json(todo)
      })
      .catch(next)
  }

  static delete(req, res, next) {
    let id = req.params.id
    Todo.findByIdAndDelete(id)
      .then(todo => {
        res.status(200).json(todo)
      })
      .catch(next)
  }

  static updateAll(req, res, next) {
    console.log("mashukkkkk update allllll");
    console.log(req.params, "params");
    console.log(req.body, "body");
    
    
    let id = req.params.id
    console.log(id, 'iddddddddd');
    let { title, description, dueDate, status } = req.body
    Todo.findByIdAndUpdate(id, { $set : { title, description, dueDate, status}}, { omitUndefined: true, new:true, runValidators: true})
      .then(todo => {
        console.log(todo, "==================")
        res.status(200).json({ todo })
      })
      .catch(next)
  }
}

module.exports = TodoController