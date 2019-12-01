const mongoose = require('mongoose')
const generateHash = require('../helpers/generateHash')

const { Schema } = mongoose

mongoose.set('useCreateIndex', true)

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please input your name!']
  },
  email: {
    type: String,
    unique: [true, 'Email address has already been used!'],
    required: [true, 'Please input your email address!'],
    validate: [
      { // email address must contains the following string
        validator(email) {
          const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return re.test(String(email).toLowerCase())
        },
        message: props => `${props.value} is not a valid email address!`
      }
    ]
  },
  password: {
    type: String,
    required: [true, 'Please input your password!'],
    min: [5, 'Your password is too short! Please input a password betwen 5-15 characters.'],
    max: [15, 'Your password is too long! Please input a password betwen 5-15 characters.']
  },
  notifications: []
}, {
  timestamps: true
})

userSchema.pre('save', function (next) {
  // only hash the password if it has been modified (or is new)
  console.log('im called')
  if (!this.isModified('password')) return next()
  else {
    let currentPassword = this.password
    this.password = generateHash(currentPassword)
    next()
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User