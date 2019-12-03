const { Schema, model } = require('mongoose')
const { hashPassword } = require('../helpers/passwordEncryptor')

const userSchema = new Schema (
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format']
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        }
    } , {
        timestamps: true,
        versionKey: false
    }
)

userSchema.pre('save', function(next) {
    this.password = hashPassword(this.password)
    next()
})

const User = model('User', userSchema)
module.exports = User