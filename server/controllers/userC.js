const { User } = require('../models')
const { compare } = require('../helpers/passwordHandler')
const { encode } = require('../helpers/tokenHandler')

class UserController {
  static signUp(req, res, next) {
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
      .then(user => {
        res.status(201).json({
          message: 'User registered',
          data: {
            username: user.username,
            email: user.email,
            password: req.body.password
          }
        })
      })
      .catch(next)
  }

  static signIn(req, res, next) {
    User.findOne({
      $or: [
        { username: req.body.username || req.body.emailUsername },
        { email: req.body.email || req.body.emailUsername }
      ]
    })
      .then(user => {
        try {
          if (!user) throw 'error'
          if (compare(req.body.password, user.password)) {
            const access_token = encode(user)
            res.status(200).json({
              message: 'Sign in success',
              data: { access_token }
            })
          } else throw 'error'
        } catch (err) {
          throw {
            status: 422,
            message: 'Username, email, or password wrong'
          }
        }
      })
      .catch(next)
  }

  static checkSession(req, res, next) {
    res.status(200).json({
      message: 'Token valid',
      data: req.payload
    })
  }
}

module.exports = UserController
