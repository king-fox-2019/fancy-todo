const Project = require('../models/Project')

module.exports = (req, res, next) => {
  try {
    const _id = req.params.id
    const user = req.loggedUser.id
    Project
      .findOne({ _id, owner: user })
      .then(project => {      
        if (!project) throw {
          name: 'Unauthorized',
          status: 401,
          message: 'Unauthorized access! You need to be the project owner to commit this action.'
        }
        next()
      })
      .catch(next)
  }
  catch (err) { next(err) }
}