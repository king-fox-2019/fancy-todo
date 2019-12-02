"use strict"

const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET

module.exports = {
  generateToken(payload) {
    return jwt.sign(payload, jwtSecret)
  },
  verifyToken(token) {
    return jwt.verify(token, jwtSecret)
  }
}