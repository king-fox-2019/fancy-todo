const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { encodePassword } = require('../helpers')

const emailRegex =  "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    validate: [
      function validator(val) {
        return new Promise(function (resolve, reject) {
          mongoose.models.User.findOne({ username: val })
            .then(function (user) {
              if (user) resolve(false)
              resolve(true)
            })
            .catch(function (err) {
              reject(err)
            })
        })
      },
      'Username already registered'
    ],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: [
      {
        validator(val) {
          const regex = new RegExp(emailRegex)
          return regex.test(val)
        },
        msg: 'Invalid email format'
      },
      {
        validator(val) {
          return new Promise(function (resolve, reject) {
            mongoose.models.User.findOne({ email: val })
              .then(function (user) {
                if (user) resolve(false)
                resolve(true)
              })
              .catch(function (err) {
                reject(err)
              })
          })
        },
        msg: 'Email already registered'
      }
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password need at least 6 characters']
  },
})

userSchema.post('validate', function(user, next) {
  user.password = encodePassword(user.password)
  next()
})


const User = mongoose.model('User', userSchema)


module.exports = User
