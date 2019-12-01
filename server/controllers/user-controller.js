const { User } = require('../models')
const { comparePassword, generateJWT } = require('../helpers')


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
              const access_token = generateJWT({ id: user._id })
              response.status(200).json({ access_token })
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
