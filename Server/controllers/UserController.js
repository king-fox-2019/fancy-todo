const User = require('../models/User')
const { compare } = require('../helpers/bcrypt')
const { sign } = require('../helpers/JWT')

class UserController{
  static login(req, res, next){
    User.findOne({email: req.body.email})
      .then((data) => {
        if (data && compare(req.body.password, data.password)){
          let access_token = sign({_id: data.id})
          res.status(200).json(access_token)
        }
        else {
          throw new Error(`Wrong email or password`)
        }
      })
      .catch(next)
  }
  static create(req, res, next){
    User.create({
      password: req.body.password,
      email: req.body.email
    })
      .then((data) => {
        res.status(201).json(data)
      })
      .catch(next)
  }
  static delete(req, res, next){
    User.deleteOne({
      _id: req.params.id
    })
      .then((data) => {
        if (data.deletedCount == 0){
          throw new Error(`User not found`)
        }
        else{
          res.status(200).json({message: `Success deleting account`})
        }
      })
      .catch(next)
  }
}

module.exports = UserController