const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Password = require('../helpers/hashPassword')

const userSchema =  new Schema({
    username:{
        type: String,
        required: [true, 'Username cannot be empty']
    },
    email: {
        type: String,
        required: [true, 'Email cannot be empty'],
        validate:{
            validator(value){
                let isEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                let valid = isEmail.test(value)
                if(valid){
                    return true
                }else{
                    return false
                }
            },
            message: props => 'Your email is not valid'
        }
    },
    password:{
        type: String,
        required: [true, 'Password cannot be empty']
    }
    
},
{
    versionKey: false,
    timestamps: true
})

userSchema.pre('save', function(next){
    let newPassword = Password.hash(this.password)
    this.password = newPassword
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User;