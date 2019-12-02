const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcryptjs = require('../helpers/bcryptjs.js');

const userSchema = new Schema({
    name : {
        type : String,
        required : [true, 'Name is required!']
    },
    email : {
        type : String,
        required : [true, 'Email is required!'],
        validate : [
            {
                validator : function(input) {
                    let regex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
                    return regex.test(input)
                },
                message : 'Invalid email format!'
            },
            {
                validator : function(input) {
                    return mongoose.model('User', userSchema)
                        .findOne({ _id : {
                            $ne : this._id
                        }, email: input })
                        .then((user) => {
                            if (user) {
                                return false
                            }
                        })
                    },
                message : 'Email is already registered!'
            }
        ]
    },
    password : {
        type : String,
        required : [true, 'Password is required!']
    },
    todos : [{
        type : Schema.Types.ObjectId,
        ref : 'Todo'
    }],
    projects : [{
        type : Schema.Types.ObjectId,
        ref : 'Project'
    }]
})

//Hooks

userSchema.pre('save', function(next){
        console.log('userSchema pre save');
    let password = bcryptjs.hash(this.password)
    this.password = password
        console.log('this.password => ',this.password)
    next();
})

// userSchema.post('validate', function(doc){
//     console.log('userSchema post validate');
//     doc.password = bcryptjs.hash(doc.password)
// })

const User = mongoose.model('User', userSchema)

module.exports = User