'use strict'

const { Todo } = require('../models/')

class todoController {

  static create(req, res, next) {
    const { title, description, dueDate } = req.body
    Todo
      .create({ title, description, dueDate, userId: req.decoded._id, status: false })
      .then(user => {
        let data = {
          id: user.id,
          description: user.description,
          title: user.title,
          dueDate: user.dueDate,
          status: user.status,
          userId: req.decoded._id
        }
        res.status(201).json(data)
      })
      .catch(next)
  }

  static read(req, res, next) {
    let keys = ['status', 'title']
    let value = {
      userId: req.decoded._id
    }

    keys.forEach(element => {
      if(req.query[element]){
        if(element == 'title'){
          value[element] = { $regex: `${req.query[element]}`}  
        } else {
          value[element] = req.query[element]
        }
      }
    })
    
    Todo
      .find(value)
    .then(todos => {
        res.status(200).json(todos)
      })
      .catch(next)
  }

  static update(req, res, next) {
    let id = req.params.id
    let { title, description, status, dueDate } = req.body
    let value = {
      title: title || undefined, description, status, dueDate
    }

    Todo
      .findByIdAndUpdate(id, value, { new: true, omitUndefined: true })
      .then(todo => {
        res.status(200).json(todo)
      })
      .catch(next)
  }

  static delete(req, res, next) {
    let id = req.params.id

    Todo
      .findByIdAndDelete(id)
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

}

module.exports = todoController