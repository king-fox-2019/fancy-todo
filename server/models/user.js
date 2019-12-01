const mongoose = require('mongoose')
const { makePass } = require('../helpers/bcrypt')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: 'Username is required'
    },
    email: {
        type: String,
        unique: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: 'Password is required'
    }
})

UserSchema.pre('save', function(next) {
    this.password = makePass(this.password)
    next()
});

module.exports = mongoose.model('User', UserSchema)