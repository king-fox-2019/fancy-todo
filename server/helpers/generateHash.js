const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(Number(process.env.BCRYPT_SALT))

function generateHash(password) {
  var hash = bcrypt.hashSync(password, salt)
  return hash
}

module.exports = generateHash