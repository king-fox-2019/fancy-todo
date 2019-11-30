const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const { passwordValidator } = require('../helpers/validator')
const { hashPassword } = require('../helpers/bcrypt')

const userSchema = new Schema({
  email : {
    type : String,
    required : [true, `Please enter your email`],
    unique : true,
    match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Invalid email format']
  },
  password : {
    type : String,
    required : [true, `Password cannot be empty`],
    minlength: [5, 'Password has to contain at least 5 character'],
    validate : passwordValidator
  }
})
userSchema.pre('save', function(next) {
  this.password = hashPassword(this.password)
  next()
})

userSchema.plugin(uniqueValidator)

const User = model('User', userSchema)

module.exports = User