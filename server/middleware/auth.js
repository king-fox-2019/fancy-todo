const { decodeJWT } = require('../helpers')
const { User, Todo } = require('../models')


function authenticate(request, response, next) {
  try {
    const payload =  decodeJWT(request.headers.access_token)

    User.findById(payload.id)
      .then(function (user) {
        if (!user) throw 'Invalid access_token'
        else {
          request.user = user
          next()
        }
      })
      .catch(function (err) {
        next({ message: err })
      })
  } catch (err) {
    next({ message: 'Invalid access_token' })
  }
}

function authorized(request, response, next) {
  const { todoId } = request.params
  const { id } = request.user

  Todo.findById(todoId)
    .then(function (todo) {
      // typeof todo.owner is object while typeof id is string, wtf?
      if (todo.owner == id) next()
      else next({ message: 'you are not authorized to doing this' })
    })
    .catch(next)
}


module.exports = { authenticate, authorized }
