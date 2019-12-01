const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hash } = require('../helpers/bcrypt')

const userSchema = new Schema({
    name: { 
        type: String,
        required: [true, "Please enter your name"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: {
            validator: function(value) {
                return User.findOne({ email: value})
                            .then(user => {
                                if(user){
                                    return false
                                }
                            })
            }, 
            message: props => 'Email already registered'
        }
    },
    password: {
        type: String,
        required: [true, "Please enter password"]
    },
    isGoogle: {
        type: Boolean,
        default: false
    }
})

userSchema.pre('save', function(next) {
    if(!this.isGoogle){
        this.password = hash(this.password)
    } else {
        this.password = hash(process.env.DEFAULT_PASSWORD)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User