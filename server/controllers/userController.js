
const User = require('../models/User')
const {verify} = require('../helpers/bcrypt')
const {generateAccessToken} = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const {hashPassword} = require('../helpers/bcrypt')

class UserController {

   static signUp(req, res, next) {

      User
      .create(req.body)
      .then(user => {
         res.status(201).json({message: 'New user created'})
      })
      .catch(next)
   }

   static signIn(req, res, next) {

      User
      .findOne({email: req.body.email})
      .then(user => {

         if(!user) res.status(400).json({message: 'email and or password are wrong'})
         else if(!verify(req.body.password, user.password)) {
            res.status(400).json({message: 'email and or password are wrong'})
         }
         else {
            const payload = {userId: user._id}
            const access_token = generateAccessToken(payload)
            res.status(200).json({access_token})
         }
      })
      .catch(next)
   }

   static googleSignIn(req, res, next) {

      let email

      client.verifyIdToken({
         idToken: req.body.id_token,
         audience: process.env.CLIENT_ID
      })
      .then(ticket => {
         email = ticket.getPayload().email

         return User.findOne({email})
      })
      .then(user => {
         if(!user) {
            // create
            const password = hashPassword(Math.random().toString(36).slice(-8))
            return User.create({email, password})
         }
         else {
            // promise jwt
            return new Promise((resolve, reject) => {
               try {
                  const payload = {userId: user._id}
                  const access_token = generateAccessToken(payload)
                  resolve(access_token)
               }
               catch(error) {
                  reject(error)
               }
            })
         }
      })
      .then(userOrToken => {
         if(typeof userOrToken == 'string') {
            res.status(200).json(userOrToken)
         }
         else {
            const payload = {userId: userOrToken._id}
            const access_token = generateAccessToken(payload)
            res.status(201).json(access_token)
         }
      })
      .catch(next)
   }
}

module.exports = UserController