"use strict"

const Task = require('../models/task');

module.exports = {
  taskAuth(req, res, next) {
  Task.findOne({ _id: req.params.id, UserId: req.decode.id })
    .then(task => {
      if (task) {
        if (String(task.UserId) === String(req.decode.id)) {
          next()
        } else {
          next({ status: 401, message: 'Unauthorized process!' })
        }
      } else {
        next({ status: 404, message: 'Task is not found' })
      }
    })
    .catch(next)
  }
}