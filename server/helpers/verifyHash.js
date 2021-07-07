const bcrypt = require('bcryptjs')

function verifyHash(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword)
}

module.exports = verifyHash