class UserController{
  static register (request, response, next) {
    const { email, password } = request.body

    response.status(201).json({ email, password })
  }

  static login (request, response, next) {
    const { email, password } = request.body

    response.status(200).json({ email, password })
  }
}

  
  module.exports = UserController
