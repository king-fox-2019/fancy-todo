'use strict';

// const bcrypt = require('../helper/bcrypt');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserShema = new Schema(
    {
        name: String,
        email: {
            type:  String,
            unique: [true, 'Email already taken'],
            validate: {
                validator: function(value) {
                    return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(value)
                },
                msg: 'Please enter corret email address'
            }
        },
        password: {
            type: String,
            minlength: [6, 'Your password is too short (min 6 characters)'],
            maxlength: [12, 'Hold up, your password is too long! (max 12 charactes)']
        },
    }
)

UserShema.pre('save', function(next){
    let user = this
    let SALT_WORK_FACTOR = 10
    if(!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt)=> {
        bcrypt.hash(user.password, salt, (err, hash)=> {
            user.password = hash
            next();
        })
    })
})

const User = mongoose.model('User', UserShema);
module.exports = User;