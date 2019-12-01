const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

function authentication(req, res, next) {
  let token = req.headers.token
  try {
    const decoded = verifyToken(token)
    User.findById({ _id: decoded.userId })
      .then(user => {
        console.log(user)
        if (user) {
          req.decoded = user
          next()
        }
      })
      .catch(next)
  } catch (err) {
    next(err)
  }
}

module.exports = authentication