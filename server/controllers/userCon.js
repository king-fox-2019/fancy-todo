const User = require('../models/User')
const {compare} = require('../helpers/encrypt')
const jwt = require('../helpers/token')

class UserController{
    static register(req, res, next){
        const {email,name,password} = req.body
        User.create({email,name,password}).then(user => {
            res.status(201).json({email,name})
        }).catch(next)
    }
    static login(req,res,next){
        let { email, password } = req.body
        User.findOne({email}).then(user =>{
            if (user && compare(password, user.password)) {
                let token = jwt.generate({id: user._id})
                res.status(200).json({access_token: token, id:user._id})
            } else {
                throw { code: 404, msg: 'invalid email / password' }
            }
        }).catch(next)
    }

    static googleSignIn(req, res, next) {
        const { token } = req.body
        const { OAuth2Client } = require('google-auth-library');
        const client = new OAuth2Client(process.env.CLIENT_ID);
    
        let payload, name, email, password
        client
          .verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
          })
          .then(ticket => {
            payload = ticket.getPayload()
            name = payload.name
            email = payload.email
            password = process.env.PASSWORD
    
            return User
              .findOne({ email })
          })
          .then(user => {
            if (!user) {
              User
                .create({
                  name, email, password
                })
                .then(user => {
                  const id = user.id
                  const payload = { email, id }
                  const access_token = jwt.generate(payload)
    
                  res.status(201).json({
                    access_token, id
                  })
                })
                .catch(next)
            }
            else {
              payload = {
                id: user.id
              }
              const access_token = jwt.generate(payload)
    
              res.status(200).json({
                access_token, id : user.id
              })
            }
          })
          .catch(next)
      }

    static findOne(req, res, next){
        let id = req.params.id
        User.findOne({_id : id}).then( user => {
            res.status(200).json(user)
        }).catch(next)
    }

    static findAll(req, res, next){
        let {name} = req.body
        User.find({name : {$in:[new RegExp(name)]}}).then( user => {
            res.status(200).json(user)
        }).catch(next)
    }
}
module.exports = UserController