'use strict'

const { Todo } = require('../models')

module.exports = (req, res, next) => {
  Todo
    .findById({ _id: req.params.id })
    .then(todo => {
      if (String(todo.userId) == String(req.decoded._id)) {
        next()
      } else {
        next({ status: 403, message: `You dont have authorize to do that` })
      }
    })
    .catch(err => { next(err) })
}




