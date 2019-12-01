const mongoose = require('mongoose')
const { hashingPassword } = require('../helpers/bcyryptjs')

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        unique:true
    },
    email: //String,
    {
        type:String,
        unique:true
    },
    password: String
})


userSchema.pre('save', function(next){
    this.password = hashingPassword(this.password)
    next()
})


const User = mongoose.model('User', userSchema)
module.exports = User