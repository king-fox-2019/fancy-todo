"use strict"

const Task = require('../models/task');

class TasksController {

  static findAll(req, res, next) {
    console.log(req.decoded.id)
    Task.find({UserId: req.decoded.id}).populate('UserId')
      .then(tasks => {
        console.log(tasks)
        res.status(200).json(tasks)
      })
      .catch(next)
  }

  static create(req, res, next) {
    const task = new Task ({
      name: req.body.name,
      description: req.body.description,
      due_date: req.body.due_date,
      UserId: req.decoded.id
    })
    task.save()
      .then(task => {
        res.status(201).json(task)
      }).catch(next)
  }

  static findOne(req, res, next) {
    Task.findOne({ _id: req.params.id, UserId: req.decoded.id}).populate('UserId')
      .then(task => {
        console.log(task)
        res.status(200).json(task)
      })
      .catch(next)
  }

  static update(req, res, next) {
    let update = {}
    for (let keys in req.body) {
      update[keys] = req.body[keys]
    }
    Task.findByIdAndUpdate(req.params.id,
      { $set: update },
      { new: true })
      .then(task => {
        res.status(200).json(task)
      })
      .catch(next)
  }

  static remove(req, res, next) {
    Task.findByIdAndDelete(req.params.id)
      .then(result => {
        res.status(200).json({ message: 'Task successfully deleted', result })
      })
      .catch(next)
  }

}

module.exports = TasksController;