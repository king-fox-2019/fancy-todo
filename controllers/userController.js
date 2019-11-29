'use strict'

const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class userController {

  static register(req, res, next) {
    const { email, password, username } = req.body

    User
      .create({ email, password, username })
      .then(user => {
        let data = {
          id: user._id,
          username: user.username,
          email: user.email
        }
        res.status(201).json(data)
      })
      .catch(next)
  }

  static login(req, res, next) {
    let value = { email: req.body.email }
    User
      .findOne(value)
      .then(userData => {
        if (userData) {
          let valid = comparePassword(req.body.password, userData.password)
          if (valid) {
            let token = generateToken({ id: userData.id })
            let user = {
              username: userData.username,
              email: userData.email,
              token
            }
            res.status(200).json(user)
          } else {
            throw ({ status: 400, message: `Password / Username is wrong` })
          }
        } else {
          throw ({ status: 400, message: `Password / Username is wrong` })
        }
      })
      .catch(next)
  }
}

module.exports = userController