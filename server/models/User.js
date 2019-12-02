const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const { hashPassword } = require("../helpers/bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username must be filled out"],
    unique: true
  },
  email: {
    type: String,
    required: [true, "email must be filled out"],
    match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "invalid email"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "password must be filled out"]
  },
  gSignIn: {
    type: Boolean,
    default: false
  }
});

userSchema.pre("save", function(next) {
  if (this.gSignIn) {
    this.password = Math.floor(Math.random() * 99999999);
  } else {
    this.password = hashPassword(this.password);
  };
  next();
});

userSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' });
const User = mongoose.model('User', userSchema);

module.exports = User;