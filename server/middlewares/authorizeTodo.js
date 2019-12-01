const Todo = require('../models/Todo')

module.exports = (req, res, next) => {
  try {
    const _id = req.params.id
    const user = req.loggedUser.id
    // console.log('ini _id pas authorize todo', _id);
    // console.log('ini userId pas authorize todo', user);
    Todo
      .findOne({ _id, user })
      .then(todo => {      
        // console.log('ini todo pas authorize todo', todo);
        if (!todo) throw {
          name: 'Unauthorized',
          status: 401,
          message: 'Unauthorized access!'
        }
        next()
      })
      .catch(next)
  }
  catch (err) { next(err) }
}