const jwt = require('jsonwebtoken')


function decodeJWT(token) {
  return jwt.verify(token, process.env.JWT_SECRET)
}

function generateJWT(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET)
}


module.exports = { decodeJWT, generateJWT }
