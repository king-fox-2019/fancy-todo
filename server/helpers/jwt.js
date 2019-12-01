const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET


// Authentication
function generateToken(payload)
  {
    return jwt.sign(payload, jwtSecret)
  }


// Verification
function verifyToken(token)
  {
    return jwt.verify(token, jwtSecret)
  }


module.exports = 
{
    generateToken,
    verifyToken
}