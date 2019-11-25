const { Todo, Group } = require('../models')
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
  authorizeTodo(req, res, next) {
    Todo.findById(req.params.id)
      .then(todo => {
        if (!todo) throw { status: 404, message: 'Todo not found' }
        else if (todo.creator == req.payload.id) next()
        else throw { status: 403, message: 'Unauthorized access to this todo' }
      })
      .catch(next)
  },
  authorizeGroup(req, res, next) {
    Group.findById(req.params.id)
      .then(group => {
        if (!group) throw { status: 404, message: 'Group not found' }
        if (group.leader == req.payload.id) {
          req.group = group
          next()
        } else
          throw { status: 403, message: 'Unauthorized access to this group' }
      })
      .catch(next)
  }
}
