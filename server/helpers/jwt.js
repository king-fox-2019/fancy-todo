const jwt = require('jsonwebtoken')

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET) //return token
}

const decodeToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET) //return payload
}

module.exports = {
  generateToken,
  decodeToken
}