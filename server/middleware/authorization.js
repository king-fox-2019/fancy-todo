const { decodeToken } = require('../helpers/jwt')
const Todo = require('../models/Todo')

function checkOwner(req, res, next) {

    try {
        Todo.findOne({
            _id: req.params.id
        })
            .then(todo => {
                if (!todo) {
                    throw ({
                        name: 'Empty',
                        message: 'Todo already deleted'
                    })
                } else {
                    const { id } = decodeToken(req.headers.access_token)
                    if (todo.owner == id) {
                        next()
                    } else {
                        throw ({
                            name: 'unauthorizedUser',
                            message: 'You are not an authorized owner.'
                        })
                    }
                }
            })
            .catch(next)
    }
    catch (error) {
        next(error)
    }

}

module.exports = { checkOwner }