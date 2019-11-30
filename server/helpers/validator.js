const validate = require('mongoose-validator')

let emailValidator = [
  validate({
    validator : `isEmail`,
    message: `Invalid email format`
  })
]

let passwordValidator = [
  validate({
    validator : `isLength`,
    arguments : 5,
    message : `Password at least ${this.arguments} character`
  })
]
module.exports = {
  emailValidator,
  passwordValidator
}