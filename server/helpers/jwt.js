const jwt = require('jsonwebtoken')

function generateToken(payload) {
    return jwt.sign(payload, process.env.SALT_JWT)
}

function decodeToken(token) {
    return jwt.verify(token, process.env.SALT_JWT)
}

module.exports = {
    generateToken,
    decodeToken
}