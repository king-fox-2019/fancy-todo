const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

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
  }
});

userSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' });
const User = mongoose.model('User', userSchema);

module.exports = User;