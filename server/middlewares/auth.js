const { Todo } = require('../models')
const { decode } = require('../helpers/tokenHandler')

module.exports = {
  authenticate(req, res, next) {
    try {
      const payload = decode(req.headers.access_token)
      req.payload = payload
      next()
    } catch {
      next({ status: 401, message: 'Valid acccess token required' })
    }
  },
  authorize(req, res, next) {
    Todo.findById(req.params.id)
      .then(todo => {
        if (!todo) throw { status: 404, message: 'Todo not found' }
        else if (todo.creator == req.payload.id) next()
        else throw { status: 403, message: 'Unauthorized access to this todo' }
      })
      .catch(next)
  }
}
