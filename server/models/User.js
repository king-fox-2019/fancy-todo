const mongoose = require('mongoose')
const {hashPassword} = require('../helpers/bcrypt')
const Schema = mongoose.Schema

const userSchema = new Schema({

   email: {
      type: String,
      required: true,
      unique: true,
      validate: {
         validator: (v) => {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v)
         }
      }
   },
   password: {
      type: String,
      required: true
   },
   todos: [{
      type: Schema.Types.ObjectId,
      ref: 'Todo'
   }],
   createdAt: {
      type: Date,
      default: Date.now()
   },
   updatedAt:{
      type: Date,
      default: Date.now()
   }
})

userSchema.pre('save', function(next) {
   this.password = hashPassword(this.password)
   next()
})

const User = mongoose.model('User', userSchema)

module.exports = User