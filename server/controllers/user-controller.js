const { User } = require('../models')
const { comparePassword, generateJWT } = require('../helpers')


class UserController{
  static register (request, response, next) {
    const { username, email, password } = request.body

    User.create({ username, email, password })
      .then(function (user) {
        response.status(201).json({ message: 'success create new user' })
      })
      .catch(next)
  }

  static login (request, response, next) {
    const { email, password } = request.body

    User.findOne({ email })
      .then(function (user) {
        try {
          if (!user) throw { name:'UserNotFound', message: 'Email or Password wrong' }
          else {
            if (comparePassword(password, user.password)) {
              const access_token = generateJWT({ id: user._id })
              response.status(200).json({ access_token })
          } else throw { name:'UserNotFound', message: 'Email or Password wrong' }
          }
        } catch (err) {
          throw err
        }
      })
      .catch(next)
  }

  static googleLogin (request, response, next) {
    const { google_token } = request.body
    const { email, name } = request.payload
    
    User.findOne({ email })
      .then(function (user) {
        const password = email + 'bla'
        if (!user) {
          return User.create({ email, password, username: name })
        } else {
          return user
        }
      })
      .then(function (user) {
        const access_token = generateJWT({ id: user._id })
        response.status(200).json({ access_token })
      })
      .catch(next)
  }
}


module.exports = UserController
