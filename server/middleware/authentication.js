'use strict'

const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

module.exports = (req, res, next) => {
  let token = req.headers.token
  try {
    const decoded = verifyToken(token)
    User
      .findById(decoded.id)
      .then(user => {
        if (user) {
          req.decoded = user
          next()
        }
      })
      .catch(err => { next(err) })
  } catch (err) {
    next(err)
  }
}