"use strict"

const User = require('../models/user')
const {validatePass} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')
const {generatePassword} = require('../helpers/password')
const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

class UsersController {

  // static findOne (req, res, next) {
  //   User.findOne({email: req.params.email})
  //     .then(data => {
  //       res.status(200).json(data)
  //     }).catch(next)
  // }

  static register(req, res, next) {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
    user.save()
      .then(data => {
        res.status(201).json(data)
      })
      .catch(next);
  }
  
  static login(req, res, next) {
    User.findOne({email: req.body.email})
      .then(user => {
        if (!user) {
          let err = {
            status: 404,
            msg: `Your email not match to any user's account`
          }
          next(err)
        } else {
          if (validatePass(req.body.password, user.password)) {
            let token = generateToken({id: user.id})
            res.status(200).json({token})
          } else {
            let err = {
              status: 403,
              msg: 'Email and/or password incorrect'
            }
            next(err)
          }
        }
      }).catch((next));
  }

  static googleLogin(req, res, next) {
    const payload = null;
    client.verifyIdToken({
      idToken: req.body.id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
      .then(ticket => {
        payload = ticket.getPayload();
        return User.findOne({email: payload.email})
      })
      .then(user => {
        if (!user) {
          return User.create({
            name: payload.name,
            email: payload.email,
            password: generatePassword()
          })
        }
      })
      .then(user => {
        payload = {id: user._id, email: user.email}
        let token = generateToken(payload)
        res.status(200).json({token})
      })
      .catch(next)
  }

}

module.exports = UsersController

