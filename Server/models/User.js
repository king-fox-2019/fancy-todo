const mongoose = require('mongoose')
const {encrypt} = require('../helpers/bcrypt')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, `Email is required`],
    unique: [true, `Email is used`]
  },
  password: {
    type: String,
    required: [true, `Password is required`]
  }
})

userSchema.pre('save', function(next){
  this.password = encrypt(this.password)
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User