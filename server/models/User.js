const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {encrypt} = require('../helpers/encrypt')
  
const UserSchema = Schema({
    email: { 
        type: String, 
        unique: true, 
    },
    name:String,
    password: String
})

UserSchema.pre('save', function(next){
    this.password = encrypt(this.password)
    next()
})

const Model = mongoose.model('User', UserSchema)
module.exports = Model