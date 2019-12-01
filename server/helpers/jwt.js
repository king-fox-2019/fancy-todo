const jwt = require('jsonwebtoken')
if(process.env.NODE_ENV == 'development') require('dotenv').config()

function generateAccessToken(payload) {
   return jwt.sign(payload, process.env.JWT_SECRET)
}

function verifyAccessToken(access_token, callback) {
   return jwt.verify(access_token, process.env.JWT_SECRET, callback)
}

module.exports = {generateAccessToken, verifyAccessToken}