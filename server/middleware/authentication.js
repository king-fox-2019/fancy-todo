const { decodeToken } = require('../helpers/jwt')
const User = require('../models/User')

const authentication = (req, res, next) => {
    try {
        const user = decodeToken(req.headers.access_token)
        User.findOne({
            email: user.email
        })
            .then(user => {
                if (user) next()
                else throw new Error({ status: 401, message: 'Authentication Failed' })
            })
            .catch(next)
    }
    catch (error) {
        next(error)
    }
}

module.exports = authentication