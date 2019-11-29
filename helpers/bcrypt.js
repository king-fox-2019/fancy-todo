'use strict'

const bycrypt = require('bcryptjs')
const salt = bycrypt.genSaltSync(11)

function hashPassword(password) {
  return bycrypt.hashSync(password, salt)
}

function comparePassword(password, hassedPassword) {
  return bycrypt.compareSync(password, hassedPassword)
}


module.exports = { hashPassword, comparePassword }