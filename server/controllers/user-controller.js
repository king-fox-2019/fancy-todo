const { User } = require('../models')
const { comparePassword } = require('../helpers')


class UserController{
  static register (request, response, next) {
    const { username, email, password } = request.body

    User.create({ username, email, password })
      .then(function (user) {
        response.status(201).json({ username, email, password })
      })
      .catch(function (err) {
        response.status(500).json(err)
      })
  }

  static login (request, response, next) {
    const { email, password } = request.body

    User.findOne({ email })
      .then(function (user) {
        try {
          if (!user) throw 'email or password wrong'
          else {
            if (comparePassword(password, user.password)) {
              response.status(200).json({ message: 'success login' })
            } else throw 'email or password wrong'
          }
        } catch (err) {
          throw { message: err }
        }
      })
      .catch(function (err) {
        response.status(500).json(err)
      })
  }
}


module.exports = UserController
