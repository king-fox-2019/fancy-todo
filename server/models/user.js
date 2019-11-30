const { Schema, model, models } =  require("mongoose")
const bcrypt = require('../helpers/bcrypt')

const  userSchema  =  new  Schema({
    name : {
        type : String,
        required : [true,"Name cannot be empty"]
    },
    email : {
        type : String,
        required: [true, "Email cannot be empty"],
        validate: [{
            validator: (value) => {
            return models.User.findOne({email : value})
                .then(user => {
                if (user) return false
                })
            },
            msg: `Email is unavailable`
        }, {
            validator: (value) => {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
            },
            msg: `Email is not valid`
        }]
    },
    password : {
        type : String,
        required: [true, "Password cannot be empty"]
    }
})

userSchema.pre('save', function(next) {
    const hashed = bcrypt.hash(this.password)
    this.password = hashed
    next()
});

const  User  =  model('User',userSchema)

module.exports  =  User