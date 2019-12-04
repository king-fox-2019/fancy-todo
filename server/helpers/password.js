const bcryptjs = require('bcryptjs')

function hashPassword (password){
  return bcryptjs.hashSync(password, bcryptjs.genSaltSync(10))
}

function verifyPassword (password, hashedPassword){
  return bcryptjs.compareSync(password, hashedPassword)
}


module.exports = {
  hashPassword,
  verifyPassword
}