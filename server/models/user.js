"use strict"

const mongoose = require('mongoose')
const { hashPass } = require('../helpers/bcrypt')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Frist name is required'
  },
  email: {
    type: String,
    unique: [true, 'This email address has already been registered'],
    required: [true, 'Email address is required'],
    validate: {
      validator: function(email) {
        return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(email);
      },
      message: 'Please input a valid email address!'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Passwords must be at least 8 characters in length']
  }
}, {
  timestamps: true
})

UserSchema.pre('save', function(next) {
  this.password = hashPass(this.password);
  this.email = this.email.toLowerCase();
  next();
});

module.exports = mongoose.model('User', UserSchema);